import { content } from './content'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = content
