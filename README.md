# Sync Await

I want to be able to code that can optionally use an asynchronous database or a synchronous in-memory database. The best option for doing this would be coroutines / generators. However, Typescript doesn't have good type support for generators. Even TypeScript 3.6 doesn't let your associate the left and right side of a `yield`. Another related concept here is algebraic datatypes.

Long story short, I've created a hack where you can use async/await in TypeScript but have `await` evaluate synchronously if the Promise resolves synchronously.

## Usage

```ts
import * as SyncAwait from "sync-await"

// __awaiter and __generator need to be defined at the top of the file. These will
// get picked up by the async/await polyfill so long as your tsconfig.json outputs es5.
const {__awaiter, __generator, runSync} = SyncAwait


// Suppose there is a sync way to do things and an async way to do things.
const sync = {
	a: () => true
}
const async = {
	a: () => new Promise(resolve => setTimeout(() => resolve(true), 1))
}

// Some business logic that can use either sync or async api.
async function f(api: typeof sync | typeof async) {
	const result = await api.a()
	return result
}

const asyncResult = f(async) // returns as Promise<true>
const syncResult = runSync(f(sync)) // returns true
```
