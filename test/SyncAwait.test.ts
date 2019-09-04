import * as SyncAwait from "../src/SyncAwait"
import { assert, describe, it } from "./mocha"

// __awaiter, __generator need to be in the namespace to override async/await logic
// injected by Typescript.
const { __awaiter, __generator, SyncPromise } = SyncAwait

function runSync<T>(promise: Promise<T>): T | undefined {
	let syncResult: T | undefined
	promise.then(result => {
		syncResult = result
	})
	return syncResult
}

describe("SyncPromise", () => {
	it("works async", () => {
		async function f() {
			// Resolve after 1 ms
			const result = await (new SyncPromise<true>(resolve =>
				setTimeout(() => resolve(true), 1)
			) as any)
			return result
		}

		const syncResult = runSync(f())
		assert.equal(syncResult, undefined)
	})

	it("works sync", () => {
		async function f() {
			// Resolve after 1 ms
			const result = await (new SyncPromise<true>(resolve =>
				resolve(true)
			) as any)
			return result
		}

		const syncResult = runSync(f())
		assert.equal(syncResult, true)
	})
})
