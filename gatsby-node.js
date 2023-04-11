const { graphql } = require("gatsby");
const path = require("path");


exports.onCreateNode = async ({ node, actions }) => {
    const { createNodeField } = actions


    // Add a category field to all MarkdownRemark nodes
    const contentDir = path.resolve("./src/content");

    if (node.internal.type === "MarkdownRemark") {
        const category = path.dirname(
            path.relative(contentDir, node.fileAbsolutePath)
        )
    const fields = {
      category: category,
      slug:
        "/" +
        category +
        "/" +
        path.basename(node.fileAbsolutePath, ".md").replace("_", "-"),
    };

        for (const [name, value] of Object.entries(fields)) {
          createNodeField({ node, name, value });
        }
    }
}