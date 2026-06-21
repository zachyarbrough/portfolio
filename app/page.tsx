import { NextPage } from 'next';
import ExternalLink from './components/ExternalLink';
import { getMetadata } from './components/data';
import PostPreview from './components/PostPreview';
import PageHeader from './components/PageHeader';
import PostHeader from './components/PostHeader';
import InternalLink from './components/InternalLInk';
import BorderLine from './components/BorderLine';
import { skills } from './config';
import ProjectPreview from './components/ProjectPreview';
import LeftSidebar from './components/LeftSidebar';
import Experience from './components/Experience';
import { email, githubUrl, linkedInUrl } from './config'
import { LocationPinIcon } from './components/assets/icons';
import EmojiWave from './components/emoji-wave';
import DropdownList from './components/DropdownList';

export async function generateMetadata() {
    return {
	title: 'Zach Yarbrough | Software Developer',
	description: 'Full stack engineer with expertise in React, TypeScript, and cloud-native applications. Zach Yarbrough has delivered mission-critical solutions for government and enterprise clients, combining technical depth with a focus on performance and maintainability.',
    }
}

const HomePage: NextPage = () => {

    const postMetadata = getMetadata('posts', 5) || []
    const projectMetadata = getMetadata('projects') || []
    const featuredProjectMetadata = projectMetadata.filter((project: any) => project.featured).slice(0, 3)

    const postPreviews = postMetadata.map((post) => (
	<PostPreview key={post.slug} {...post} />
    ))

    const projectPreviews = featuredProjectMetadata.map((project) => (
	<ProjectPreview key={project.slug} {...project} />
    ))

    return (
	<>
	    <LeftSidebar />
	    <div style={{
		maxWidth: '750px',
		display: 'flex',
		flexDirection: 'column',
		margin: '0 auto'
	    }}>
		<div> <PageHeader noCopy={true}>Welcome! <EmojiWave /></PageHeader></div>
		<div style={{ margin: '1rem 0', padding: '1rem 1rem 1rem 1rem', borderRadius: '0.5rem', backgroundColor: 'var(--secondary-light)', width: '100%' }}>
		    <p style={{ padding: '0 0 0.5rem 0 ' }}>
			I am a <span className='font-bold'>Full-Stack Developer</span> specializing in the MERN stack. I'm currently pursuing my <span className='font-bold'>Master's of Computer Science</span> at <span className='font-bold'>Rice University</span>.	
		    </p>
		    <p style={{display: 'flex', verticalAlign: 'start', padding: '0.5rem 0' }}><LocationPinIcon /> <span>Houston, TX</span></p>
		    <ul className='flex' style={{ gap: '1rem', padding: '0.5rem 0 0 0' }}>
			<li>Contact Me:</li>
			<li><ExternalLink href={linkedInUrl}>LinkedIn</ExternalLink></li>
			<li><ExternalLink href={githubUrl}>Github</ExternalLink></li>
			<li><ExternalLink isMail={true} href={email}>Email</ExternalLink></li>
		    </ul>
		    <DropdownList startExpanded={false} title="More Info" style={{ margin: '1rem 0 0 0' }}>
			<p style={{ paddingTop: '1rem' }}>Check out my personal setup and workflow in my <ExternalLink href='https://github.com/ZachYarbrough/dotfiles'>dotfiles</ExternalLink> repo.</p>
			<p style={{ padding: '0.5rem 0' }}>Currently Reading: <ExternalLink href='https://www.goodreads.com/book/show/68428.Mistborn'>Mistborn: The Final Empire - Brandon Sanderson</ExternalLink></p>
		    </DropdownList>
		</div>
		<div className='flex justify-between'>
		</div>
		<div style={{ margin: '1rem 0', width: '100%' }}>
		    <div className='flex justify-between item-center' style={{ margin: '0 0 1rem 0' }}>
		    <PostHeader headerNumber={1.5} noCopy={true}>Featured Projects</PostHeader>
		    <InternalLink parentClass='arrow-link' style={{ marginTop: '1rem' }} href='/projects'>View More <span className='arrow' style={{ marginLeft: '0.5rem'}}>→</span></InternalLink>
		    </div>
		    <div className ='flex-wrap' style={{ display: 'flex', justifyContent: 'space-between' }}>
			{projectPreviews}
		    </div>
		</div>
		<div style={{ margin: '1rem 0' }}> 
		    <PostHeader headerNumber={1.5} noCopy={true}>Experience</PostHeader>
		    <Experience />
		</div>
		<div style={{margin: '1rem 0'}}>
		    <div className='flex justify-between items-center'>
			<PostHeader headerNumber={1.5} noCopy={true}>Recent Posts</PostHeader>
			{postPreviews.length > 4 && <InternalLink parentClass='arrow-link' href='/posts'>View More  <span className='arrow' style={{ marginLeft: '0.5rem' }}>→</span></InternalLink>}
		    </div>
		    <div>
			{postPreviews}
		    </div>
		</div>
	    </div>
	    <BorderLine />
	</>
    )
}

export default HomePage
