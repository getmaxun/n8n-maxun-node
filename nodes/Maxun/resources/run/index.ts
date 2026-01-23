import type { INodeProperties } from 'n8n-workflow';
import { runExecuteDescription } from './execute';
import { runGetStatusDescription } from './getStatus';
import { runGetAllDescription } from './getAll';

const showOnlyForRun = {
	resource: ['run'],
};

export const runDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForRun,
		},
		options: [
			{
				name: 'Execute',
				value: 'execute',
				action: 'Execute a robot',
				description: 'Execute a robot and wait for results',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/sdk/robots/{{$parameter.robotId}}/execute',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many runs for a robot',
				description: 'Get many runs for a robot',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/sdk/robots/{{$parameter.robotId}}/runs',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
						],
					},
				},
			},
			{
				name: 'Get Single Run',
				value: 'getStatus',
				action: 'Get run status',
				description: 'Get the status and data of a robot run',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/sdk/robots/{{$parameter.robotId}}/runs/{{$parameter.runId}}',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
							},
						],
					},
				},
			},
		],
		default: 'execute',
	},
	...runExecuteDescription,
	...runGetStatusDescription,
	...runGetAllDescription,
];
