import type {
	ILoadOptionsFunctions,
	INodeListSearchItems,
	INodeListSearchResult,
} from 'n8n-workflow';

export async function getRobots(
	this: ILoadOptionsFunctions,
	filter?: string,
): Promise<INodeListSearchResult> {
	const baseUrl = 'https://app.maxun.dev';

	const response = await this.helpers.httpRequestWithAuthentication.call(this, 'maxunApi', {
		method: 'GET',
		url: `${baseUrl}/api/sdk/robots`,
		json: true,
	});

	// Response format: { data: [...] }
	let robots = response.data || [];

	// Filter by name if filter is provided
	if (filter) {
		const lowerFilter = filter.toLowerCase();
		robots = robots.filter((robot: { recording_meta?: { name?: string } }) => 
			robot.recording_meta?.name?.toLowerCase().includes(lowerFilter)
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
