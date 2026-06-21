'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import { CodeBracketIcon, GlobeIcon, TagIcon } from './assets/icons'
import ExternalLink from './ExternalLink'
import InternalLink from './InternalLInk'
import Image from './Image'
import PostHeader from './PostHeader'

// TODO - Add tags to the bottom and possibly bigger description
const ProjectPreview = ({ slug, title, source, live, description, preview, technologyUsed, hidePreview = false }: any) => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }

        window.addEventListener("resize", handleResize)

        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [setWidth])

    return (
        <>
            {width >= 768 && <div style={{ border: '1px solid var(--secondary-light)', backgroundColor: 'var(--secondary-light)', borderRadius: '0.5rem', padding: '1rem',  width: '49%', marginBottom: '1rem' }}>
                {!hidePreview && <InternalLink href={`/projects/${slug}`}>
                    <Image src={preview} alt={title} className="scale-image" imgStyle={{ width: '328px', height: '183px', cursor: 'pointer', borderRadius: '0.5rem', border: '1px solid var(--secondary-light)' }} hideModal={true} />
                </InternalLink>}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <InternalLink href={`/projects/${slug}`}>
                        <PostHeader headerNumber={1.2} noCopy={true}><span className='highlight-text hover:highlight-text'>{title}</span></PostHeader>
                    </InternalLink>
                            <div style={{ width: '5rem', marginTop: '0.5rem', textAlign: 'right' }}>
			    {live && <ExternalLink tooltip='Live Demo' showIcon={false} href={live}>
                                   <GlobeIcon />
                                </ExternalLink>}
                            {source && <ExternalLink tooltip='Source Code' showIcon={false} href={source}>
                                    <CodeBracketIcon />
                                </ExternalLink>}
                            </div>
			    </div>
                {!hidePreview && <p>{description}</p>}
		{!hidePreview && 
		    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1rem 0 0 0' }}>
			<span style={{ color: 'var(--secondary)'}} ><TagIcon /></span>
			{technologyUsed.map((tag: string) => (
			    <InternalLink key={tag} useBubbleStyle={true} href={`/tags/${tag}`} parentClass='more-info-tag-color'>{tag}</InternalLink>
			))}
		    </div>}
            </div>}
            {width < 768 && <div style={{ display: 'flex', backgroundColor: 'var(--secondary-light)', justifyContent: 'space-between', border: '1px solid var(--secondary-light)', borderRadius: '0.5rem', padding: '1rem', marginTop: '1rem', width: '100%' }}>
                <>
                    {!hidePreview &&
                        <div style={{ width: '206px', marginRight: '1rem' }}>
                            <InternalLink href={`/projects/${slug}`}>
				<Image src={preview} alt={title} className="scale-image" imgStyle={{ cursor: 'pointer', width: '155px', height: '90px', borderRadius: '0.5rem', border: '1px solid var(--secondary-light)' }} hideModal={true} />
                            </InternalLink>
                        </div>
                    }
                    <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <InternalLink href={`/projects/${slug}`}>
                        <PostHeader headerNumber={1.2} noCopy={true}><span className='text-highlight'>{title}</span></PostHeader>
                    </InternalLink>
			    {hidePreview && <div style={{ width: '5rem', textAlign: 'right' }}>
			    {live && <ExternalLink tooltip='Live Demo' showIcon={false} href={live}>
                                   <GlobeIcon />
                                </ExternalLink>}
                            {source && <ExternalLink tooltip='Source Code' showIcon={false} href={source}>
                                    <CodeBracketIcon />
                                </ExternalLink>}
                            </div>}
			</div>
                        {!hidePreview && <p>{description}</p>}
                    </div>
                </>

            </div>}
        </>
    )
}

export default ProjectPreview
