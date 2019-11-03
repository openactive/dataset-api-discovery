
function dataExampleDatasetEmbed(utils, content) {
  return generateScriptInclude({
    "@context": ["https://schema.org", "https://openactive.io/"],
    "@type": "Dataset",
    "id": "https://data.example.com/",
    "url": "https://data.example.com/",
    "name": "Acme Leisure Sessions and Facilities",
    "description": "Near real-time availability and rich descriptions relating to the sessions and facilities available from Acme Leisure, published using the OpenActive Modelling Specification 2.0.",
    "keywords": [
      "Sessions",
      "Facilities",
      "Activities",
      "Sports",
      "Physical Activity",
      "OpenActive"
    ],
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "distribution": [
      {
        "additionalType": "https://openactive.io/SessionSeries",
        "encodingFormat": "application/vnd.openactive+json; rpde=1.0, model=2.0",
        "contentUrl": "https://example.com/open-api/feeds/session-series",
        "@type": "DataDownload",
        "name": "SessionSeries"
      },
      {
        "additionalType": "https://openactive.io/ScheduledSession",
        "encodingFormat": "application/vnd.openactive+json; rpde=1.0, model=2.0",
        "contentUrl": "https://example.com/open-api/feeds/sessions",
        "@type": "DataDownload",
        "name": "ScheduledSession"
      },
      {
        "additionalType": "https://openactive.io/FacilityUse",
        "encodingFormat": "application/vnd.openactive+json; rpde=1.0, model=2.0",
        "contentUrl": "https://example.com/open-api/feeds/facility-uses",
        "@type": "DataDownload",
        "name": "FacilityUse"
      },
      {
        "additionalType": "https://openactive.io/Slot",
        "encodingFormat": "application/vnd.openactive+json; rpde=1.0, model=2.0",
        "contentUrl": "https://example.com/open-api/feeds/slots",
        "@type": "DataDownload",
        "name": "Slot"
      }
    ],
    "potentialAction": [potentialActionExampleContent],
    "discussionUrl": "https://github.com/example/opendata/issues",
    "documentation": "https://docs.example.com/",
    "inLanguage": "en-GB",
    "publisher": {
      "legalName": "Acme Leisure Ltd",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      },
      "email": "info@example.com",
      "@type": "Organization",
      "name": "Acme Leisure",
      "description": "We are able to continually reinvest in facilities, products and importantly people.",
      "url": "https://example.com/"
    },
    "datePublished": "2019-02-20T13:22:28.7743707Z",
    "schemaVersion": "https://www.openactive.io/modelling-opportunity-data/2.0/"
  });
}

function dataExamplePotentialAction(utils, content) {
  return `"potentialAction": ${jsonStringify(potentialActionExampleContent)}`;
}


var potentialActionExampleContent = {
  "@type": "OpenBookingAction",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://example.com/api/orders/{uuid}",
    "encodingType": ["application/vnd.openactive+jsonld; model=2.0, booking=1.0"],
    "httpMethod": "PUT"
  },
  "supportingData": {
    "@type": "DataFeed",
    "distribution": [
      {
        "@type": "DataDownload",
        "name": "Order",
        "additionalType": "https://schema.org/Order",
        "encodingFormat": ["application/vnd.openactive+json; model=2.0, booking=1.0, rpde=1.0"],
        "contentUrl": "https://example.com/api/feeds/offers"
      }
    ]
  }
};




/***** Helper Functions *****/

function generateScriptInclude(json) {
  return `&#x3C;script type=&#x22;application/ld+json&#x22;&#x3E;
${jsonStringify(json)}
&#x3C;/script&#x3E;`;
}

function generateRequest(verb, path, mediaType, json) {
  return generateRequestHeaders(verb, path, mediaType) + (json ? "\n\n" + jsonStringify(json) : "");
}

function generateResponseWithHeaders(responseCode, path, mediaType, headers, json) {
  return generateResponseHeaders(responseCode, path, mediaType) + "\n" + headers + (json ? "\n\n" + jsonStringify(json) : "");
}

function generateResponse(responseCode, path, mediaType, json) {
  return generateResponseHeaders(responseCode, path, mediaType) + (json ? "\n\n" + jsonStringify(json) : "");
}

function jsonStringify(json) {
  return JSON.stringify(json, null, 2);
}

function generateRequestHeaders(verb, path, mediaType) {
  return `${verb} ${path} HTTP/1.1
Host: example.com
Date: Mon, 8 Oct 2018 20:52:35 GMT
Accept: ${mediaType}`
}

function generateResponseHeaders(responseCode, path, mediaType) {
  return `HTTP/1.1 ${responseCode}
Date: Mon, 8 Oct 2018 20:52:36 GMT
Content-Type: ${mediaType}${path ? '\nLocation: ' + path : ''}`
}