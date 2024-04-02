/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="../.astro/db-types.d.ts" />
/// <reference types="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		session: import('lucia').Session | null
		user: import('lucia').User | null
	}
}
