import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { resolveUrl } from '../../utils/routing'
import useOptions from '../../utils/use-options'
import { useLang, get } from '../../utils/use-lang'

import { AuthorList, ImgSharp } from '.'
import { PostClass } from './helpers'

const PostCard = ({ post, num, isHome }) => {
    const { basePath } = useOptions()
    const text = get(useLang())
    const url = resolveUrl(basePath, post.collectionPath, post.slug, post.url)
    const featImg = post.featureImageSharp && post.featureImageSharp.publicURL || post.feature_image
    const fluidFeatureImg = post.featureImageSharp && post.featureImageSharp.childImageSharp && post.featureImageSharp.childImageSharp.fluid
    const readingTime = readingTimeHelper(post).replace(`min read`,text(`MIN_READ`))
    const postClass = PostClass({ tags: post.tags, isFeatured: post.featured, isImage: featImg && true })
    const large = featImg && isHome && 0 === num % 6 && `post-card-large` || ``

    const authors = post.authors.filter((author, i) => (i < 2 ? true : false))

    return (
        <article className={`post-card ${postClass} ${large}`}>

            <Link className="post-card-image-link" to={url}>
                <ImgSharp clearPosition={true} fluidClass="post-card-image" srcClass="post-card-image" fluidImg={fluidFeatureImg} srcImg={featImg} title={post.title} />
            </Link>

            <div className="post-card-content">
                <Link className="post-card-content-link" to={url} >
                    <header className="post-card-header">
                        {post.primary_tag &&
                            <div className="post-card-primary-tag">{post.primary_tag.name}</div>
                        }
                        <h2 className="post-card-title">{post.title}</h2>
                    </header>
                    <section className="post-card-excerpt">
                        {/* post.excerpt *is* an excerpt and does not need to be truncated any further */}
                        <p>{post.excerpt}</p>
                    </section>
                </Link>

                <footer className="post-card-meta">
                    <AuthorList authors={post.authors} />
                    <div className="post-card-byline-content">
                        {post.authors.length > 2 &&
                            <span>{text(`MULTIPLE_AUTHORS`)}</span>
                        }
                        {post.authors.length < 3 &&
                            <span>
                                {authors.map((author, i) => (
                                    <>
                                        {i > 0 ? `, ` : ``}
                                        <Link key={i} to={resolveUrl(basePath, `/`, author.slug, author.url)}>{author.name}</Link>
                                    </>
                                ))}
                            </span>
                        }
                        <span className="post-card-byline-date">
                            <time dateTime={post.published_at}>
                                {post.published_at_pretty}&nbsp;
                            </time>
                            <span className="bull">&bull; </span> {readingTime}
                        </span>
                    </div>
                </footer>
            </div>
        </article>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        url: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.object.isRequired,
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
        authors: PropTypes.arrayOf(
            PropTypes.object.isRequired,
        ).isRequired,
        primary_tag: PropTypes.shape({
            name: PropTypes.string.isRequired,
        }),
        published_at: PropTypes.string.isRequired,
        published_at_pretty: PropTypes.string.isRequired,
        featureImageSharp: PropTypes.object,
        collectionPath: PropTypes.string,
    }).isRequired,
    num: PropTypes.number,
    isHome: PropTypes.bool,
}

export default PostCard
