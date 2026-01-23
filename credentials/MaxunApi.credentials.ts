import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MaxunApi implements ICredentialType {
	name = 'maxunApi';

	displayName = 'Maxun API';

	icon: Icon = 'file:../icons/maxun.svg';

	documentationUrl = 'https://docs.getmaxun.com/api';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your Maxun API key. Get it from your Maxun dashboard under Settings > API Keys.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.maxun.dev',
			url: '/api/sdk/robots',
			method: 'GET',
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};
}
