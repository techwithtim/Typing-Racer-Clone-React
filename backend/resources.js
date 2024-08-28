export class Scores extends tables.Score {
	allowRead() {return true}

	post(content) {
		content.region = server.config.clustering.nodeName
		return super.post(content)
	}
}

