// ── Type Inference ────────────────────────────────

// TypeScript infers these — no annotation needed
let newUserName = "Alice";        // inferred: string
let count = 42;             // inferred: number
let active = true;          // inferred: boolean
let ids = [1, 2, 3];        // inferred: number[]

// ERROR — TS won't let you reassign to wrong type
newUserName = 42; // ❌ Type 'number' is not assignable to type 'string'


// When to annotate explicitly:

// 1. Function parameters (TS can't infer these)
function double(n: number) { return n * 2; }

// 2. Variables declared without a value
let myResult: string;
// ... later
myResult = "done";

// 3. Return types of important functions (makes intent clear)
function getPort(): number {
  return parseInt(process.env.PORT ?? "3000");
}