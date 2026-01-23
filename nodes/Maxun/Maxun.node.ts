import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { robotDescription } from './resources/robot';
import { runDescription } from './resources/run';
import { getRobots } from './listSearch/getRobots';

export class Maxun implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Maxun',
		name: 'maxun',
		icon: 'file:maxun.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Automate web data extraction with Maxun - no-code web scraping',
		defaults: {
			name: 'Maxun',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'maxunApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://app.maxun.dev',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Robot',
						value: 'robot',
						description: 'Manage extraction robots',
					},
					{
						name: 'Run',
						value: 'run',
						description: 'Manage robot runs and get results',
					},
				],
				default: 'robot',
			},
			...robotDescription,
			...runDescription,
		],
	};

	methods = {
		listSearch: {
			getRobots,
		},
	};
}
