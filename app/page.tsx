'use client'

import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
import { MakeRealButton } from './components/MakeRealButton'
import { TldrawLogo } from './components/TldrawLogo'
import { RiskyButCoolAPIKeyInput } from './components/RiskyButCoolAPIKeyInput'
import { PreviewShapeUtil } from './PreviewShape/PreviewShape'
import { useSession, signIn, signOut } from 'next-auth/react'

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
})

const shapeUtils = [PreviewShapeUtil]

export default function App() {
	const { data: session } = useSession()

	if (!session) {
		return (
			<div>
				<button onClick={() => signIn()}>Sign in</button>
			</div>
		)
	}

	return (
		<div className="editor">
			<Tldraw persistenceKey="make-real" shareZone={<MakeRealButton />} shapeUtils={shapeUtils}>
				<TldrawLogo />
				<RiskyButCoolAPIKeyInput />
			</Tldraw>
			<button onClick={() => signOut()}>Sign out</button>
		</div>
	)
}
