import fs from 'fs'
import Markdown from 'markdown-to-jsx'
import matter from 'gray-matter'
import { getBacklink, getMetadata, getRelativePosts, getTimeToRead } from '@/app/components/data'
import { formatDate, getTableOfContents } from '@/app/components/general'
import CodeBlock from '@/app/components/CodeBlock'
import Paragraph from '@/app/components/Paragraph'
import projectHeader from '@/app/components/PostHeader'
import BlockQuote from '@/app/components/BlockQuote'
import BulletLists from '@/app/components/BulletLists'
import InternalLink from '@/app/components/InternalLInk'
import projectLink from '@/app/components/PostLink'
import BreadcrumbTrail from '@/app/components/BreadcrumbTrail'
import RightSidebar from '@/app/components/RightSidebar'
import LeftSidebar from '@/app/components/LeftSidebar'
import PostHeader from '@/app/components/PostHeader'
import PageHeader from '@/app/components/PageHeader'
import Image from '@/app/components/Image'
import BorderLine from '@/app/components/BorderLine'
import { Project } from '@/app/types/posts'
import ContentFooter from '@/app/components/ContentFooter'
import MarkdownRenderer from '@/app/components/MarkdownRenderer'
import ExternalLink from '@/app/components/ExternalLink'
import { notFound } from 'next/navigation'
import { CalendarIcon, TagIcon } from '@/app/components/assets/icons'
/**
    * Generates static paths for all projects
* 
    * @returns {Array<{ slug: string }>} An array of objects with the slug of each project
*/
export const generateStaticParams = async () => {
    const projects = getMetadata('projects')
    if (!projects) return notFound()
    return projects.map((project: any) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: any) {
    const data = await params
    const post = getProjectContent(data.slug)

    return {
	title: (post?.title || '404 - Not Found') + ' | Zach Yarbrough',
	description: post?.description || '',
    }
}

const getRelativePostContent = (slug: string): any => {
    try {
	const folder = 'posts/'
	const file = `${folder}${slug}.md`
	const content = fs.readFileSync(file, 'utf8')
	const matterResult = matter(content)

	return {
	    title: matterResult.data.title,
	    slug: slug,
	    folder: 'posts'
	}
    } catch(err) {
	console.log(err)
	return null
    }
} 

/**
    * Retrieves the content of a project from a markdown file in the project directory
* 
    * @param {string} slug - The slug of the project to retrieve
* @returns {Post} A Post object containing the post's metadata and content
*/
const getProjectContent = (slug: string): Project | null => {
    try {
	const folder = 'projects/'
	const file = `${folder}${slug}.md`
	const content = fs.readFileSync(file, 'utf8')
	const matterResult = matter(content)

	// Get headers with regex that matches the format '# Header', '## Header', etc.
	const headers = (matterResult.content + '\n').match(/(#+ .*\n)/g) || []
	const tableOfContents = getTableOfContents(headers, true)

	const relatedPosts = matterResult.data.related ? matterResult.data.related.map((post: any) => getRelativePostContent(post)) : []

	return {
	    title: matterResult.data.title,
	    description: matterResult.data.description,
	    date: formatDate(matterResult.data.date),
	    tags: matterResult.data.tags,
	    headers: headers,
	    tableOfContents: tableOfContents,
	    technologyUsed: matterResult.data.technology_used || [],
	    preview: matterResult.data.preview,	
	    gallery_path: matterResult.data.gallery_path,
	    gallery: getGalleryImages(matterResult.data.gallery_path),
	    timeToRead: getTimeToRead(matterResult.content),
	    slug: slug,
	    related: relatedPosts,
	    content: matterResult.content,
	    source: matterResult.data.source,
	    live: matterResult.data.live
	}
    } catch (err) {
	console.log(err)
	return null	
    }
}

const getGalleryImages = (path: string) => {
    const files = fs.readdirSync(path)
    const imageFiles = files.filter((file) => !file.includes('_blurred') && (file.endsWith('.jpg') || file.endsWith('webp') || file.endsWith('jpeg') || file.endsWith('png') || file.endsWith('gif')))
    return imageFiles
}

const ProjectPage = async ({ params }: any) => {
    const { slug } = await params
    const project: Project | null = getProjectContent(slug)

    if (!project) return notFound()

    return (
	<>
	    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', maxWidth: '750px', margin: '0 auto' }}>
		<LeftSidebar />
		<div style={{ width: '100%', margin: '0 auto' }}>
		    <BreadcrumbTrail />
		    <PageHeader>{project.title}</PageHeader>
		    <p style={{ color: 'var(--secondary)' }}><CalendarIcon /> {project.date}</p>
		    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.5rem 0 1rem 0' }}>
			<span style={{ color: 'var(--secondary)'}} ><TagIcon /></span>
			{[...project.technologyUsed, ...project.tags].map((tag: string) => (
			    <InternalLink key={tag} useBubbleStyle={true} href={`/tags/${tag}`}>{tag}</InternalLink>
			))}
		    </div>
		    {project?.live && <div className='font-bold'>Live: <ExternalLink href={project.live}>{project.live}</ExternalLink></div>}
		    {project?.source && <div className='font-bold'>Repository: <ExternalLink href={project.source}>{project.source}</ExternalLink></div>}
		    <MarkdownRenderer content={project.content} />        
		    {project?.gallery?.length > 0 && 
			<div>
			    <PostHeader headerNumber={1.5}>Gallery</PostHeader>
			    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
				{project.gallery.map((imagePath: string) => {
				    return <div key={imagePath} style={project.gallery.length > 1 ? { margin: '0.5rem', width: '45%', height: 'auto' } : { margin: '0.5rem', width: '95%', height: 'auto' }} >
					<Image src={project.gallery_path.split('public')[1] + imagePath} alt={imagePath} className='sm-display-none scale-image' imgStyle={{ width: '100%', height: '100%', borderRadius: '0.5rem', border: '1px solid var(--secondary-light)' }} />
				    </div>
				})}	
				{project.gallery.map((imagePath: string) => {
				    return <div key={imagePath} style={{ margin: '0.5rem 0', width: '100%', height: 'auto' }}>
					<Image src={project.gallery_path.split('public')[1] + imagePath} alt={imagePath} className='sm-display' imgStyle={{ width: '100%', height: 'auto', borderRadius: '0.5rem', border: '1px solid var(--secondary-light)' }} hideModal={true} />
				    </div>
				})}
			    </div>
			</div>
		    }
		</div>
	    </div>
	    <RightSidebar post={project} />
	    <BorderLine />
	    <ContentFooter post={project} />
	</>
    )
}

export default ProjectPage
