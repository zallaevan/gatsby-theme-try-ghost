import { graphql, useStaticQuery } from "gatsby"

const useOptions = () => {
    const data = useStaticQuery(graphql`
    {
        ghostConfig(id: { eq: "gatsby-theme-try-ghost-config" }) {
            basePath
            gatsbyImageLoading
            gatsbyImageFadeIn
        }
    }`)

    return data.ghostConfig
}

export default useOptions
