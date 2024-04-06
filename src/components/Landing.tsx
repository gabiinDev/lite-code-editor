/* eslint-disable multiline-ternary */
import { useEffect } from 'preact/hooks'
import BoxAddNew from './BoxAddNew'
import useProject from '../hooks/useProject'
import { PROJECTS_BASE_ROUTE, type IProjectModel } from '../types/models/project/projectModel'
import BoxSigin from './BoxSignin'
import useUser from '../hooks/useUser'
import BoxEdit from './BoxEdit'
import MenuUserSection from './MenuUserSection'
import useLoading from '../hooks/useLoading'

const Landing = () => {
	const { isLoggedIn } = useUser()
	const { Loading } = useLoading('Loading projects ...')
	const { getUserProyects, userProjects, loadingProjects, setLoadingProjects } = useProject()
	useEffect(() => {
		setLoadingProjects(true)
		getUserProyects()
			.then()
			.finally(() => setLoadingProjects(false))
	}, [])

	return loadingProjects ? (
		<Loading />
	) : (
		<section className='grid grid-rows-[auto,1fr] place-items-center w-full px-10'>
			<header className='text-center pb-5'>
				<h2 className='text-4xl text-white opacity-80 pt-20 pb-2 font-bold'>Workspace</h2>
			</header>
			<article className='center rounded-md border-2 shadow-lg shadow-slate-600 border-slate-600 w-full lg:w-3/6 grid grid-rows-[1fr,auto]'>
				<section className='flex w-full items-end pt-5 pr-5'>
					<div className='ml-auto'>
						<MenuUserSection />
					</div>
				</section>
				<section className='px-8 py-10'>
					<h3 className='text-3xl text-white opacity-80 font-semibold pb-7'>Projects</h3>
					<div className='grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-7 items-center w-full place-content-center'>
						<BoxAddNew linkTo='/projects/new' />
						{!isLoggedIn ? (
							<BoxSigin linkTo='/api/auth/github' />
						) : (
							userProjects?.map((project: IProjectModel) => (
								<BoxEdit name={project.name} linkTo={`${PROJECTS_BASE_ROUTE}/${project.slug}`} />
							))
						)}
					</div>
					{isLoggedIn ? (
						<>
							<hr className='w-full h-px my-10 bg-gray-200 border-0 dark:bg-gray-700'></hr>
							<h3 className='text-3xl text-white opacity-80 font-semibold pb-7'>
								Beta Preview <span className='text-2xl'>(only javascript)</span>
							</h3>
							<div className='grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-7 items-center w-full place-content-center'>
								<BoxAddNew linkTo='/projects/javascript/new' />
							</div>
						</>
					) : null}
				</section>
			</article>
		</section>
	)
}

export default Landing
