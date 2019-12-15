define({ "api": [
  {
    "type": "get",
    "url": "artifacts/",
    "title": "searches for all Artifacts",
    "version": "0.0.0",
    "filename": "routes/api/api.artifacts.js",
    "group": "E__git_krc_Server_routes_api_api_artifacts_js",
    "groupTitle": "E__git_krc_Server_routes_api_api_artifacts_js",
    "name": "GetArtifacts"
  },
  {
    "type": "get",
    "url": "artifacts/:id",
    "title": "",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\"description\": [String], \"name\": String, \"story\": String, metaData: Object }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/api/api.artifacts.js",
    "group": "E__git_krc_Server_routes_api_api_artifacts_js",
    "groupTitle": "E__git_krc_Server_routes_api_api_artifacts_js",
    "name": "GetArtifactsId"
  }
] });
