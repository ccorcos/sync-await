import * as SyncAwait from "../src/SyncAwait"
import { assert, describe, it } from "./mocha"

// __awaiter, __generator need to be in the namespace to override async/await logic
// injected by Typescript.
const { __awaiter, __generator, SyncPromise, runSync } = SyncAwait

describe("SyncPromise", () => {
	it("works async", () => {
		async function f() {
			// Resolve after 1 ms
			const result = await (new SyncPromise<true>(resolve =>
				setTimeout(() => resolve(true), 1)
			) as any)
			return result
		}
		assert.throws(() => runSync(f()))
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
