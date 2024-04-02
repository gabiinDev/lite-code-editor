/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import { useStore } from '@nanostores/preact'
import { useEffect } from 'preact/hooks'
import type { MenuItem } from '../types/menuOptions'
import type { IExternalFrameworkCssVariantModel } from '../types/models/project/externalFrameworkCssVariantModel'
import MenuDropdown from './MenuDropdown'
import MenuItemButton from './MenuItemButton'
import { initDropdowns } from 'flowbite'
import type { IExternalFrameworkModel } from '../types/models/project/externalFrameworkModel'
import {
	menuExternalFrameworksStore,
	setMenuExternalFrameworksStore,
	setMenuOpenStore
} from '../store/menuStore'
import useProject from '../hooks/useProject'

const MenuFrameworkList = () => {
	const menuExternalFrameworksOptions = useStore(menuExternalFrameworksStore)
	const { currentProject, setCurrentProjectConfig } = useProject()

	const handleOptionClick = (
		{ externalFramework, type }: MenuItem,
		selectedVariant?: IExternalFrameworkCssVariantModel | undefined
	) => {
		if (currentProject?.config) {
			currentProject.config.externalFramework = externalFramework
			currentProject.config.selectedExternalFrameworkCss = selectedVariant
			currentProject.config.idExternalFramework = externalFramework.id
			setCurrentProjectConfig(currentProject.config)
		}
		setMenuOpenStore(false)
		if (type === 'dropdown') {
			const $dropdownButton = document.getElementById('dropdownNavbarLink')
			if ($dropdownButton) {
				const $targetId = $dropdownButton.getAttribute('data-dropdown-toggle')
				const $targetDropdown = document.getElementById($targetId ?? '')
				if ($targetDropdown) {
					$targetDropdown.classList.toggle('hidden')
				}
			}
		}
	}

	useEffect(() => {
		initDropdowns()
	}, [menuExternalFrameworksOptions])

	useEffect(() => {
		async function getMenuOptions() {
			const data = await fetch('/api/external-framework')
			const json: IExternalFrameworkModel[] = await data.json()

			const menuResult: MenuItem[] = json.map((framework) => {
				return {
					name: framework.name,
					type: framework.type === 'natal-framework' ? 'dropdown' : 'button',
					externalFramework: framework
				}
			})
			setMenuExternalFrameworksStore(menuResult)
		}
		if (!menuExternalFrameworksOptions) getMenuOptions()
	}, [])

	return (
		<ul className='pt-10 gap-4 flex justify-center items-center'>
			{menuExternalFrameworksOptions && currentProject && currentProject.config
				? menuExternalFrameworksOptions.map((item) => {
						return (
							<li className='text-sm text-gray-500 dark:text-gray-400'>
								{
									// eslint-disable-next-line multiline-ternary
									item.type === 'button' ? (
										<MenuItemButton
											onClick={() => handleOptionClick(item)}
											title={item.name}
											isActive={
												currentProject?.config?.externalFramework?.type ===
												item.externalFramework.type
											}
										/>
									) : (
										<MenuDropdown
											title={item.name}
											isActive={
												currentProject?.config?.externalFramework?.type ===
												item.externalFramework.type
											}
										>
											<ul
												className='p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200'
												aria-labelledby='dropdownNavbarLink'
											>
												{item.externalFramework?.cssVariants?.map((cssVariant) => {
													return (
														<li>
															<div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
																<input
																	id={`radio-${cssVariant.type}`}
																	type='radio'
																	value={cssVariant.type}
																	name={`radio-${item.externalFramework.type}`}
																	className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
																	onClick={() => handleOptionClick(item, cssVariant)}
																	checked={
																		currentProject?.config?.selectedExternalFrameworkCss?.type ===
																		cssVariant.type
																	}
																/>
																<label
																	for={`radio-${cssVariant.type}`}
																	className='w-full ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
																>
																	{cssVariant.name}
																</label>
															</div>
														</li>
													)
												})}
											</ul>
										</MenuDropdown>
									)
								}
							</li>
						)
				  })
				: null}
		</ul>
	)
}
export default MenuFrameworkList
