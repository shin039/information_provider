/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path   = require("path")
const logger = require("./src/util/logger.js");

logger.debug("■ gatsby-node.js --------------------------------------------");

// -----------------------------------------------------------------------------
// onCreateNode
// -----------------------------------------------------------------------------
exports.onCreateNode = ({ node, getNode }) => {
  const reject = ["Site", "SiteBuildMetadata", "SitePlugin", "SitePage", "ImageSharp"]
  const type   = node.internal.type;

  if(! reject.includes(type)){
    logger.debug(`Create Node => ${type} (${makeDebugInfo(type, node)})`);
  }

  // ContentfulTx
  // if(type === `ContentfulTx`){ console.dir(node) }
}

const makeDebugInfo = (internal_type, node) => {
  if(internal_type === "File"           ) return `name: ${node.name}.${node.extension}`;
  if(internal_type === "ContentfulAsset") return `title: ${node.title}`;
  return `name: ${node.name}`;
}

// -----------------------------------------------------------------------------
// createPages
// -----------------------------------------------------------------------------
exports.createPages = async ({graphql, actions, reporter }) => {
  const {createPage} = actions;

  logger.debug("-- START createPages ----------------------------------------------------------");
  const result = await graphql(
    `{
      allContentfulTx {
        edges {
          node {
            name
            productNo
            image { localFile { publicURL } }
          }
        }
      }
    }`
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const { edges } = result.data.allContentfulTx

  edges.forEach( ({node}) => {
    createPage({
      path: `/tx/${node.productNo}/`,
      component: path.resolve("./src/template/tx_tmpl.js"),
      context: { tx_data: node }
    })
  });
  
  logger.debug("-- END   createPages ----------------------------------------------------------");
  
}
