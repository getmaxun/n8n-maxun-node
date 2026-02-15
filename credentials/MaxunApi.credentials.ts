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

	documentationUrl = 'https://docs.maxun.dev';

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
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://app.maxun.dev',
			required: false,
			placeholder: 'https://app.maxun.dev',
			description:
				'Maxun API base URL. For self-hosted, set to your Maxun backend origin (e.g. https://maxun.example.com). Trailing slashes are supported and automatically normalized.',
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
			baseURL: '={{($credentials.baseUrl || "https://app.maxun.dev").replace(/\\/+$/, "")}}',
			url: '/api/sdk/robots',
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};
}
