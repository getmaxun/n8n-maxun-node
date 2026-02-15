import type {
	IDataObject,
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { getMaxunSdkBaseUrl } from '../helpers/url';

export async function getRobots(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	const credentials = await this.getCredentials('maxunApi');
	const baseUrl = getMaxunSdkBaseUrl(credentials.baseUrl as string | undefined);

	let response: IDataObject;

	try {
		response = await this.helpers.httpRequestWithAuthentication.call(this, 'maxunApi', {
			baseURL: baseUrl,
			method: 'GET',
			url: '/api/sdk/robots',
			headers: {
				Accept: 'application/json',
			},
			json: true,
		});
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message:
				'Unable to load robots from Maxun. Verify your API key and Base URL, then try again.',
		});
	}

	// Response format: { data: [...] }
	let robots = (response.data as Array<{ recording_meta?: { id?: string; name?: string } }>) || [];

	// Filter by name if filter is provided
	if (filter) {
		const lowerFilter = filter.toLowerCase();
		robots = robots.filter(
			(robot: { recording_meta?: { name?: string } }) =>
				robot.recording_meta?.name?.toLowerCase().includes(lowerFilter),
		);
	}

	const results: INodeListSearchItems[] = robots.map((robot: {
		recording_meta?: { id?: string; name?: string };
	}) => ({
		name: robot.recording_meta?.name || 'Unnamed Robot',
		value: robot.recording_meta?.id || '',
	}));

	return {
		results,
	};
}
