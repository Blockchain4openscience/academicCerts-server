/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function getTarget() {
	if (process.env.REST_SERVER_URLS) {
		const restServerURLs = JSON.parse(process.env.REST_SERVER_URLS);
		const restServerURL = restServerURLs['bforos-bnav1'];
		if (restServerURL) {
			return restServerURL;
		}
	}
	if (process.env.REST_SERVER_URL) {
		const restServerURL = process.env.REST_SERVER_URL;
		return restServerURL;
	}
	return 'http://li403-56.members.linode.com:3000';
}

const target = getTarget();

module.exports = [{
	context: ['/api', '/auth'],
	target: target,
	secure: true,
	changeOrigin: true
}, {
	context: '/',
	target: target,
	secure: true,
	changeOrigin: true,
	// ws: true,
	bypass: function (req, res, proxyOptions) {
		const accept = req.headers.accept || '';
		if (accept.indexOf('html') !== -1) {
			console.log('Skipping proxy for browser request');
			return '/index.html';
		}
		req.headers['X-Custom-Header'] = 'yes';
	}
}];
