import type { Contract } from './types';

/**
 * contracts.ts — the only way this cluster talks to the other two.
 *
 * Versioned events with JSON Schema. No shared database, no shared domain
 * logic. None of the three systems requires the others to function.
 *
 * The chain the Group Constitution describes:
 *   Energy detects an asset anomaly
 *   → Operations creates an inspection work order
 *   → Physical AI performs the inspection
 *   → the result returns to Energy.
 */

const base = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  additionalProperties: false,
};

const provenance = {
  type: 'object',
  required: ['producer', 'producedAt', 'traceId'],
  properties: {
    producer: { type: 'string', enum: ['energy', 'physical-ai', 'operations'] },
    producedAt: { type: 'string', format: 'date-time' },
    traceId: { type: 'string' },
  },
};

export const contracts: Contract[] = [
  {
    id: 'AssetAnomalyDetected',
    version: '0.1.0',
    producer: 'energy',
    consumer: 'operations',
    summary: 'Energy Intelligence reports an anomaly on an identified asset. Physical AI never consumes this directly.',
    schema: {
      ...base,
      $id: 'https://igrimaldi.engineering/api/cluster/contracts/AssetAnomalyDetected/0.1.0',
      title: 'AssetAnomalyDetected',
      required: ['event', 'version', 'assetId', 'anomaly', 'severity', 'provenance'],
      properties: {
        event: { const: 'AssetAnomalyDetected' },
        version: { const: '0.1.0' },
        assetId: { type: 'string', description: 'Asset identity as agreed in the shared asset-identity primitive.' },
        anomaly: { type: 'string' },
        severity: { type: 'string', enum: ['info', 'warning', 'critical'] },
        location: { type: 'object', properties: { lat: { type: 'number' }, lon: { type: 'number' } } },
        provenance,
      },
    },
  },
  {
    id: 'InspectionWorkOrder',
    version: '0.1.0',
    producer: 'operations',
    consumer: 'physical-ai',
    summary: 'Operations converts an event into a work order. This is the only input by which work reaches a robot, and it enters the gate at PLAN.',
    schema: {
      ...base,
      $id: 'https://igrimaldi.engineering/api/cluster/contracts/InspectionWorkOrder/0.1.0',
      title: 'InspectionWorkOrder',
      required: ['event', 'version', 'workOrderId', 'assetId', 'requestedBy', 'authorizationRequired', 'provenance'],
      properties: {
        event: { const: 'InspectionWorkOrder' },
        version: { const: '0.1.0' },
        workOrderId: { type: 'string' },
        assetId: { type: 'string' },
        requestedBy: { type: 'string' },
        procedureRef: { type: 'string', description: 'Documented inspection procedure the plan must follow.' },
        authorizationRequired: { const: true, description: 'Always true. A work order never authorises execution by itself.' },
        dueBy: { type: 'string', format: 'date-time' },
        provenance,
      },
    },
  },
  {
    id: 'InspectionResult',
    version: '0.1.0',
    producer: 'physical-ai',
    consumer: 'energy',
    summary: 'Physical AI returns evidence and a report. Every step of the gate that ran is recorded; a result without a VERIFY record is invalid.',
    schema: {
      ...base,
      $id: 'https://igrimaldi.engineering/api/cluster/contracts/InspectionResult/0.1.0',
      title: 'InspectionResult',
      required: ['event', 'version', 'workOrderId', 'assetId', 'gate', 'findings', 'provenance'],
      properties: {
        event: { const: 'InspectionResult' },
        version: { const: '0.1.0' },
        workOrderId: { type: 'string' },
        assetId: { type: 'string' },
        gate: {
          type: 'object',
          description: 'Timestamps for each gate step. VERIFY is mandatory.',
          required: ['plan', 'simulate', 'validate', 'authorize', 'execute', 'verify'],
          properties: {
            plan: { type: 'string', format: 'date-time' },
            simulate: { type: 'string', format: 'date-time' },
            validate: { type: 'string', format: 'date-time' },
            authorize: { type: 'object', required: ['at', 'by'], properties: { at: { type: 'string', format: 'date-time' }, by: { type: 'string' } } },
            execute: { type: 'string', format: 'date-time' },
            verify: { type: 'string', format: 'date-time' },
          },
        },
        findings: {
          type: 'array',
          items: {
            type: 'object',
            required: ['class', 'confidence', 'evidenceRef'],
            properties: {
              class: { type: 'string' },
              confidence: { type: 'number', minimum: 0, maximum: 1 },
              location: { type: 'object', properties: { x: { type: 'number' }, y: { type: 'number' }, z: { type: 'number' } } },
              evidenceRef: { type: 'string', description: 'Content-addressed reference to the image, point cloud or measurement.' },
            },
          },
        },
        provenance,
      },
    },
  },
  {
    id: 'PalletizingKpiSnapshot',
    version: '0.1.0',
    producer: 'physical-ai',
    consumer: 'operations',
    summary: 'The twelve palletizing KPIs as a dated snapshot. What the simulator and, later, a cell must emit; what /palletizer reads.',
    schema: {
      ...base,
      $id: 'https://igrimaldi.engineering/api/cluster/contracts/PalletizingKpiSnapshot/0.1.0',
      title: 'PalletizingKpiSnapshot',
      required: ['event', 'version', 'source', 'fixtureSet', 'measuredAt', 'kpis', 'provenance'],
      properties: {
        event: { const: 'PalletizingKpiSnapshot' },
        version: { const: '0.1.0' },
        source: { type: 'string', enum: ['simulation', 'cell'] },
        fixtureSet: { type: 'string', description: 'Version of the published fixture set the run used.' },
        measuredAt: { type: 'string', format: 'date-time' },
        kpis: {
          type: 'object',
          required: ['cycles-per-hour', 'successful-picks', 'failed-picks', 'intervention-rate', 'changeover-time'],
          properties: {
            'cycles-per-hour': { type: 'number' },
            'successful-picks': { type: 'integer' },
            'failed-picks': { type: 'integer' },
            'intervention-rate': { type: 'number' },
            'changeover-time': { type: 'number' },
            'deployment-time': { type: 'number' },
            'robot-utilization': { type: 'number' },
            'gripper-utilization': { type: 'number' },
            'sku-complexity': { type: 'number' },
            downtime: { type: 'number' },
            'labor-savings': { type: 'number' },
            'payback-period': { type: 'number' },
          },
        },
        provenance,
      },
    },
  },
];

export function getContract(id: string): Contract | undefined {
  return contracts.find((c) => c.id === id);
}
