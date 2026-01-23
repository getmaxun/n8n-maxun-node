import type { INodeProperties } from 'n8n-workflow';
import { robotGetDescription } from './get';
import { robotDeleteDescription } from './delete';

const showOnlyForRobot = {
	resource: ['robot'],
};

export const robotDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForRobot,
		},
		options: [
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a robot',
				description: 'Delete a robot by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/sdk/robots/{{$parameter.robotId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a robot',
				description: 'Get a specific robot by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/sdk/robots/{{$parameter.robotId}}',
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
				action: 'Get many robots',
				description: 'Get many robots for your account',
				routing: {
					request: {
						method: 'GET',
						url: '/api/sdk/robots',
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
		default: 'getAll',
	},
	...robotGetDescription,
	...robotDeleteDescription,
];
