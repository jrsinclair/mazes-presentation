# The joy of recursion, immutable data, and pure functions

James Sinclair

---

# Making mazes with JavaScript

---

## Why Mazes?

Note: I want to start by addressing the elephant in the room. Why the heck am I talking about making mazes at a professional web development conference?

---

## Practical

Note: I try to be practical when I'm writing or speaking. I want to give people tools they can use to make their coding lives better. So, instead of giving examples about adding numbers together, I talk about creating DOM elements and processing JSON data. Those things are practical. I don't want to waste people's time on things they're not going to use.

---

## Mazes aren't practical

Note: But, mazes, they're not so practical.  
Unless you're working in game development, it's unlikely that you're going to need a maze in your web app. So, in that sense, knowing how to build a maze is useless. You're never going to use it.

---

## Why mazes?

Note: Why am I here, then? Why bother telling you all about something you're never going to use?

---

## A Goldilocks problem

Note: The nice thing about generating mazes is that the problem is not too big, and not too small. An issue I often have is that people ask me for 'real world' examples. But the trouble with 'real world' examples is that they're way more complex than you can reasonably talk about in a 25 minute presentation. But a maze is just complex enough to be interesting.

---

## And it's not a to do list

Note: And it's not a to do list

---

## Immutable data

## Recursion

Note: And we can build our maze in such a way that we'll learn about immutable data and recursion while we're at it.

---

## Let's go

Note: So let's get into it.

---

## How do we build a maze?

Note: How then, do we build a maze?

---

<figure class="maze-diagram">
 <img src="/grid.svg" alt="" />
</figure>

Note: We start with a grid. This one is a 4 &times; 4 grid with 16 'rooms' and 'walls' between each room.

---

<figure class="maze-diagram">
 <img alt="Starting with a room in the middle" src="/starting-square.svg" />
</figure>

Note: We start by picking a room at random. I've picked one near the middle, but it could be any room in the grid.

---

<figure class="maze-diagram">
 <img alt="Four adjoining rooms to the north, south, east, and west" src="/four-adjoining-rooms.svg" />
</figure>

Note: Then, we make a list of the adjoining rooms to the north, south, east, and west that _aren't_ already connected to another room.

---

<figure class="maze-diagram">
 <img alt="Join the room to the north" src="/join-room-north-01.svg" />
</figure>

Note: We pick one of those rooms at random, and we punch a hole through the wall connecting those two rooms.

---

<figure class="maze-diagram">
 <img alt="Two adjoining rooms to the east and west" src="/two-adjoining-rooms.svg" />
</figure>

Note: Then, we repeat that process for the room we've just connected. This time, we have only two directions to choose from. This is because the room to the south is connected to this one, and we're butting up against the north edge.

---

<figure class="maze-diagram">
 <img alt="Join the room to the west" src="/join-room-west.svg" />
</figure>

Note: This time we'll pick the room to the west.

---

<figure class="maze-diagram">
 <img alt="Join the room to the south" src="/join-room-south-01.svg" />
</figure>

Note: Then we join the room to the south, because there's nowhere else to go.

---

<figure class="maze-diagram">
 <img alt="Join the room to the south" src="/join-room-south-02.svg" />
</figure>

Note: And we keep joining rooms.

---

<figure class="maze-diagram">
 <img alt="Join the room to the south" src="/south-east-adjoining-rooms-01.svg" />
</figure>

---

<figure class="maze-diagram">
 <img alt="Join the room to the south" src="/join-room-south-03.svg" />
</figure>

Note: Until.

---

<figure class="maze-diagram">
 <img alt="Join the room to the east" src="/join-room-east-01.svg" />
</figure>

Note: we reach a point.

---

<figure class="maze-diagram">
 <img alt="Join the room to the south" src="/north-east-adjoining-rooms-03.svg" />
</figure>

---

<figure class="maze-diagram">
 <img alt="Join the room to the east" src="/join-room-east-02.svg" />
</figure>

Note: Where.

---

<figure class="maze-diagram">
 <img alt="Choose between options to the north and the east" src="/north-east-adjoining-rooms.svg" />
</figure>

Note: We can't.

---

<figure class="maze-diagram">
 <img alt="Join room to the north" src="/join-room-north-02.svg" />
</figure>

Note: go.

---

<figure class="maze-diagram">
 <img alt="Choose between options to the north, east, and west" src="/north-east-west-adjoining-rooms.svg" />
</figure>

Note: any.

---

<figure class="maze-diagram">
 <img alt="Join room to the west" src="/join-room-west-02.svg" />
</figure>

Note: Further.

---

<figure class="maze-diagram">
 <img alt="Room with no more available adjacent rooms" src="/back-track-point.svg" />
</figure>

Note: And we reach a room where there are no more directions to choose from.

---

<figure class="maze-diagram">
 <img alt="Backtrack one square" src="/back-track-one-square.svg" />
</figure>

Note: Once we get there, then we backtrack one square.

---

<figure class="maze-diagram">
 <img alt="Choose between options to the north, and east" src="/north-east-adjoining-rooms-02.svg" />
</figure>

Note: And start again.

---

<figure class="maze-diagram">
 <img alt="Almost complete maze" src="/final-maze.svg" />
</figure>

Note: We keep repeating this process until we have no unconnected squares left.

---

<figure class="maze-diagram">
 <img alt="Complete maze" src="/final-maze-with-exits.svg" />
</figure>

Note: Once that's done, we can pick an entry and an exit.

---

## Use your words

Note: Let's try and write that out in words, as an algorithm.

---

1. Start with a grid of unconnected rooms and a randomly selected room. <!-- .element: class="fragment" data-fragment-index="0" -->
2. Make a list of rooms adjacent to the current room, not yet connected to another room. <!-- .element: class="fragment" data-fragment-index="1" -->
3. If this list is empty, go back one room and repeat from 2 (or finish). <!-- .element: class="fragment" data-fragment-index="2" -->
4. Pick one of the rooms in the list at random and connect it. <!-- .element: class="fragment" data-fragment-index="3" -->
5. Move to this new room and repeat from 2. <!-- .element: class="fragment" data-fragment-index="4" -->

---

## Let's turn that into code

Note: We now know the basic approach. Our next step is to turn that into code.  
But, to make life easier for ourselves, we're going to create an immutable data structure… from scratch.

---

## Immutable

Note: Now, in case you're wondering, 'immutable' simply means 'doesn't change'. We're going to write a class in such a way that once you create an object, you can't modify it.

---

## Point

Note: We'll create a helper class, Point, that represents and x, y coordinate.

---

```javascript
// point.js
class Point {
  x;
  y;
}
```

Note: If we were using TypeScript, I might do things differently, but with Vanilla JS we'll create a class. And it has two properties: an x-value and a y-value.

---

```javascript [5-8]
// point.js
class Point {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

Note: So we'll create a constructor that takes an x-value and a y-value. And we now have a simple class.

---

## This isn't immutable (yet)

Note: Now, so far, this is rather obvious and boring. And it's not immutable. So what we're going to do is hide this class away. We won't export it. Instead, we're going to create a constructor function, `point()`, and that will be the only way to get yourself a point.

---

```javascript
// point.js
export function point(x, y) {
  // This is is how the function would work if it were
  // not immutable.
  const p = new Point(x, y);
  return p;
}
```

Note: It takes an x and a y coordinate, and returns as a Point object. But we still haven't achieved immutability yet. To do that, we're going to memoise this function. That is, we're going to create a cache of all the x/y values we've seen so far, and if we've already seen one we'll return the point we've already created.

---

```javascript
// point.js
const allPoints = new Map();
```

Note: Ironically, we make this happen by creating a mutable Map to act as our cache.

---

```javascript [1-9|3-4|6-8]
// point.js
export function point(x, y) {
  const key = `${x}-${y}`;
  if (allPoints.has(key)) return allPoints.get(key);

  const newPoint = new Point(x, y);
  allPoints.set(key, newPoint);
  return newPoint;
}
```

Note: So, when a new call for a point comes in, we convert the x/y pair into a string. Then we use that to check to see if we've already seen this pair of numbers before. If we have, we return the existing point. If not, we'll create a new one.

---

```javascript [7]
// point.js
export function point(x, y) {
  const key = `${x}-${y}`;
  if (allPoints.has(key)) return allPoints.get(key);

  const newPoint = new Point(x, y);
  Object.freeze(newPoint);
  allPoints.set(key, newPoint);
  return newPoint;
}
```

Note: While we're at it, we'll freeze the object so the runtime will stop anyone who tries to change those x or y values.

---

## Why?

Note: OK. We now have a helper class. And let's face it, it doesn't do much. So why do we bother? Why not just use a plain ol' JavaScript object? Zero code needed.

---

## ===

Note: For now, building a special class like this lets me do something plain objects can't. I can compare them using triple equals. (This may change in future, but for now we make do with what we have).

---

```javascript
const objA = {x: 3, y: 5};
const objB = {x: 3, y: 5};
objA === objB; // false

const pointA = point(3, 5);
const pointB = point(3, 5);
pA === pB // true
```

Note: So let's try this. I'll create an object A, and I create an object B and compare them with `===`, and I get `false`. But if I use my `point()` function, and I do `===`, I get `true`.

---

## So what?

Note: Again, you might legitimately ask, 'So what?' But things get interesting if I combine this with other data structures.

---

## Map

Note: For example, I could use these points as keys in a Map. I'm going to use the Map from the venerable Immutable.js library, but it will work just fine with the built-in JavaScript Map too.

---

```javascript [4-12|14-21]
import { Map } from 'immutable';
import { point } from './point';

const mapWithObjects = Map([
  [{x: 3, y: 5}, 'object A'],
  [{x: 3, y: 5}, 'object B']
]);
console.log(mapWithObjects.toArray());
// Logs: [
//   [{x: 3, y: 5}, 'object A'],
//   [{x: 3, y: 5}, 'object B']
// ]

const mapWithPoints = Map([
  [point(3, 5), 'First Point 3,5'],
  [point(3, 5), 'Second Point 3,5']
]);
console.log(mapWithPoints.toArray());
// Logs: [
//   [Point {x: 3, y: 5}, 'Second Point 3,5']
// ]
```

Note: Again, I'm using Immutable.js Map, but  you can use the built-in JS class just fine too. And this is where things start to get interesting. Because using the right data structures will be crucial for our maze-building algorithm.

---

## Algorithm

Note: So, let's get into writing our algorithm. We'll go over it one more time.

---

1. Start with a grid of unconnected rooms and a randomly selected room. <!-- .element: class="fragment" data-fragment-index="0" -->
2. Make a list of rooms adjacent to the current room, not yet connected to another room. <!-- .element: class="fragment" data-fragment-index="1" -->
3. If this list is empty, go back one room and repeat from 2 (or finish). <!-- .element: class="fragment" data-fragment-index="2" -->
4. Pick one of the rooms in the list at random and connect it. <!-- .element: class="fragment" data-fragment-index="3" -->
5. Move to this new room and repeat from 2. <!-- .element: class="fragment" data-fragment-index="4" -->

---

## Step 1

Note: If we're going to turn this algorithm into code. We need to set things up so we can start our algorithm in the right state. The two main things we need are:

---

1. A grid of unconnected rooms <!-- .element: class="fragment" data-fragment-index="0" -->
2. A random room to start in <!-- .element: class="fragment" data-fragment-index="1" -->

---

## A grid of unconnected rooms

Note: For now, were going to assume we're only building square mazes. And to help us build our set of unconnected rooms, we're going to do a little bit of math. 

---

$$ n ^ 2 $$

Note: So the total number of rooms will be $$n^2$$. So we can create an array with $$n^2$$ entries, and map over it to create a Map.

---

## Point → List<Point>

Note: This (immutable) Map will have points as keys, and each value for the map will be a List of rooms it's connected to.

---

## Building the grid

Note: So let's build our grid

---

```javascript
import {Map, List} from 'immutable';

const emptyArray = new Array(n ** 2).fill(undefined);
const roomList = emptyArray.map(
  (_, i) => [point(i % n, Math.floor(i / n)), List()]
);
const grid = Map(roomList);
```

Note: All we do is create an array with n^2 entries, then we map over it to create an array of pairs. The left item in each pair is a point. And the right item in the pair is an empty list. We then pass that list of pairs to the Map constructor and that creates our Map.

---

## A random room to start in

Note: In our algorithm, we need to pick things at random. Like, for instance, our starting room. But for this exercise, we're trying to work with pure functions as much as possible. And something that's different every time you call it is considered 'impure'. So, we're going to quickly whip up our own pseudo random number generator to sidestep this problem.

---

```javascript
// random.js
const M = 2 ** 31; // This defines our range of integers
const A = 110351245;
const C = 12345;

export function randomInt(seed) {
  return (A * seed + C) % M;
}
```

Note: I won't go into the details of how this one works, but it's using prime numbers to generate a pseudo-random sequence. And this implementation is a lot like the random number generator that most implementations of the C language use.

---

```javascript
import { randomInt } from './random';

// The seed can be any integer. Often, we use Date.now().
const seed = 1093487523;
const randomValue1 = randomInt(seed);
const randomValue2 = randomInt(randomValue1);
```

Note: To get random numbers, we start with a seed. And this seed can be any integer. We pass that seed to our `randomInt()` function. And, once we've called that, we can get another pseudorandom value by passing that seed to `randomInt()` again. And if I keep doing that, I can get as many pseudorandom numbers as I want. But, if I give it the same starting seed, I will always get the same sequence of integers.

---

```javascript
export function randomInRange(seed, n) {
  const nextSeed = randomInt(seed);
  const randVal = Math.abs(nextSeed) % n;
  return [nextSeed, randVal];
}
```

Note: For our purposes though, we' mostly want a random number in a range between 0 and some number. So we'll use another helper. All it does is a little bit of math to make the random number fit the range we want. But, it also returns the raw integer, so we can use it as a seed for future generation.

---

```javascript [1-16|6-10|12-14|15]
// maze.js
import {Set, List} from 'immutable';
import {randomInRange} from './random.js';

function buildInitialState(n, seed) {
  const emptyArray = new Array(n ** 2).fill(undefined);
  const roomList = emptyArray.map(
    (_, i) => [point(i % n, Math.floor(i / n)), List()]
  );
  const grid = Map(roomList);

  const [newSeed, roomIdx] = randomInRange(n ** 2);
  const room = roomList[roomIdx][0];

  return [room, grid, newSeed];
}
```

Note: With that in place, we're now able to pick a starting room at random from the grid. And we can put that all into a single function that generates our initial state.

---

## Recursion

Note: We're ready to code our actual algorithm. Now, we're going to do this using recursion. And recursion has a bad reputation.

---

## Scary

Note: People think it's scary. And often they think it's scary because it's easy to get yourself into a situation where you have infinite recursion. And that's fair. I understand that.

---

## Loops are also scary

Note: But I would argue that it's just as easy to get yourself into a situation where you write a loop that never terminates. You probably don't do that, though, because you've been taught how to write loops safely.

---

## Rules for safe loops

Note: You've most likely been taught two rules:

---

1. Pay attention to the state you're changing <!-- .element: class="fragment" data-fragment-index="0" -->
2. Know the exit condition <!-- .element: class="fragment" data-fragment-index="1" -->

---

```javascript [1-5|1,4|2]
let i = 10;
while (i > 0) {
  // Do something
  i--;
}
```

Note: If you're writing a while loop, for example, that repeats something 10 times, you make darn sure you've got some counter, `i` and that you decrement it each time around the loop. That counter `i` is the state we're changing. The thing we need to pay attention to.  
  
And the exit condition is built in to while loops. In this case, `i > 0`.

---

## Thinking recursively

Note: When we're writing recursive algorithms, we pay attention to _the same things_. They simply happen to live in different locations.

---

## State goes in function parameters

Note: For a recursive function, the state we're changing always goes into the function parameters (assuming we're working with pure functions). And if you need to update more pieces of state, then you'll need more function parameters.

---

## Check exit conditions early

Note: Most of the time, when we write a recursive function, we check our exit condition as early as possible. Much like how the exit condition is the first thing you write in a for-loop.

---

## What is the state for  our maze algorithm?

Note: Let's apply this to our maze algorithm. What state do we update as we go through the process?

---

1. The current room <!-- .element: class="fragment" data-fragment-index="0" -->
2. The maze so far <!-- .element: class="fragment" data-fragment-index="1" -->
4. The random seed<!-- .element: class="fragment" data-fragment-index="2" -->

Note: At each step, we're considering a particular room. And the room we're considering changes, so that means it's part of our state.  
Another thing we do as we go along is we update our maze by updating the list of rooms a given room is connected to. And there's one final piece of state that might not  be obvious.  
That's our random number seed. So we'll pass that along for the next iteration of our algorithm.

---

```javascript
// maze.js
function buildMaze(room, mazeSoFar, seed0) {
  // Maze building code goes here
}
```

Note: So we have enough here to create the signature for our function.

---

## Make a list of adjacent rooms not yet connected to another room

Note: We've already figured out how to select a room at random. So let's figure out step 2 of our algorithm. We make a list of adjacent rooms that aren't yet connected. Let's write a function to do that.

---

```javascript
// point.js
export const NORTH = point(0, -1);
export const EAST = point(1, 0);
export const SOUTH = point(0, 1);
export const WEST = point(-1, 0);
```

Note: We'll start by creating some constants. We have North, South, East, and West here.

---

```javascript
// point.js
export const addPoint = (a) => (b) => point(
  a.x + b.x,
  a.y + b.y
);
```

Note: And then we'll create a helper function to add two points together:

---

```javascript
// maze.js
import {point, NORTH, SOUTH, EAST, WEST} from './point';

function getCandidates(room, mazeSoFar) {
    return [NORTH, SOUTH, EAST, WEST]
        .map(addPoint(room))
        .filter((pt) => mazeSoFar.get(pt)?.size === 0);
}
```

Note: And with those in place, we can write a function to find unconnected adjacent rooms. We make an array of the four directions, map over it with `addPoint()` to get all the adjacent rooms. Then we filter out the rooms that are already connected.

---

```javascript [8-9]
// maze.js
function buildMaze(room, mazeSoFar, seed0) {

  // Find adjacent unconnected rooms.
  const candidates = getCandidates(room, mazeSoFar);
}
```

Note: We can then use that in our main function.

---

## What if there are no adjacent unconnected rooms?

Note: Now, it might be that there are no unconnected rooms left adjacent to the current room. That means we've gone as far as we can along this path.

---

```javascript [10-12]
// maze.js
function buildMaze(room, mazeSoFar, seed0) {

  // Find adjacent unconnected rooms.
  const candidates = getCandidates(room, mazeSoFar);
  if (candidates.length === 0) {
    return /* ????? */;
  }
}
```

Note: So, we're supposed to go back one room. In our case, that means we'll return. This becomes our exit condition. We'll come back and fill in that return value in a moment.

---

## Step 4

---

```javascript [10-12]
// maze.js
function buildMaze(room, mazeSoFar, seed0) {

  // Find adjacent unconnected rooms.
  const candidates = getCandidates(room, mazeSoFar);
  if (candidates.length === 0) {
    return /* ????? */;
  }

  // Pick a room from the list of candidates.
  const [seed1, idx] = randomInRange(seed0, candidates.length);
  const roomToConnect = candidates[idx];
}
```

Note: Next, we pick a room from the candidate list at random. That give us a new seed that we'll hold on to for now.

---

```javascript [1-17|6-9|11-12]
// maze.js
function buildMaze(room, mazeSoFar, seed0) {
  
  // … Snip …

  // Construct a new maze with the connected room.
  const mazeWithConnectedRoom = mazeSoFar
    .set(room, mazeSoFar.get(room).push(newRoom))
    .set(newRoom, mazeSoFar.get(newRoom).push(room));

  // Move to the newly connected room.
  const someReturnValueWeHaventFiguredOut = buildMaze(roomToConnect, mazeWithConnectedRoom, seed1);
}
```

Note: So, we now know which room to move on to next. So, we can connect two rooms by updating our Map, pushing each room onto the list. And we move on to the next room by calling our `buildMaze()` function recursively. We just have to make sure that we update each piece of state that we pass on. And again, we still need to figure out that return value.

---

## What do we do when we get back?

Note: When we call that, our algorithm is going to go off and connect a bunch of rooms in a long branch off this one. But, there's a chance that when it comes back, there still might be unconnected rooms adjacent to this one. So we make _another_ recursive call, but pass _the same room_ to try out the remaining candidates.

---

## But what's the state now?

Note: However, when we call the recursive function, we need to make sure we update the state. And for that, we need the previous call to tell us what the new state should be. In particular, we need 2 things:

---

1. The updated maze
2. A new random seed

Note: We already know which room to pass along. But this list tells us what our return value from the function needs to be. Each time we call `buildMaze()` we will need to pass back each of these two values.

---

```javascript [12|14-16]
// maze.js
function buildMaze(room, mazeSoFar, seed0) {
  
  // … Snip …

  // Construct a new maze with the connected room.
  const mazeWithConnectedRoom = mazeSoFar
    .set(room, mazeSoFar.get(room).push(newRoom))
    .set(newRoom, mazeSoFar.get(newRoom).push(room));
  
  // Move to the newly connected room.
  const [newMaze, seed2] = buildMaze(roomToConnect, mazeWithConnectedRoom, seed1);
  
  // There may still be other directions we can connect
  // to this room, so we call buildMaze() again.
  return buildMaze(room, newMaze, seed2);
}
```

Note: So we fill in those return values. And with those in place, we can make the final recursive call.

---

```javascript [7|1-25]
// maze.js
function buildMaze(room, mazeSoFar, seed0) {

  // Find adjacent unconnected rooms.
  const candidates = getCandidates(room, unconnected);
  if (candidates.length === 0) {
    return [mazeSoFar, seed0];
  }

  // Pick a room from the list of candidates.
  const [seed1, idx] = randomInRange(seed0, candidates.length);

  // Construct a new maze with the connected room.
  const mazeWithConnectedRoom = mazeSoFar
    .set(room, mazeSoFar.get(room).push(newRoom))
    .set(newRoom, mazeSoFar.get(newRoom).push(room));
  
  // Move to the newly connected room.
  const [newMaze, seed2] = buildMaze(roomToConnect, mazeWithConnectedRoom, seed1);
  
  // There may still be other directions we can connect
  // to this room, so we call buildMaze() again.
  return buildMaze(room, newMaze, seed2);
}
```

Note: If we go back and sort out the other return values then that's it. We have everything we need to build our maze.

---

## Wiring it all together

Note: All we need to do is wire it up with the initial sate. We'll do that in a new function.

---

```javascript
// maze.js
export function maze(n, seed0) {
  const [room, emptyMaze, seed1] = buildInitialState(n, seed0);
  const [maze] = buildMaze(room, emptyMaze seed1);
  return maze;
}
```

Note: We craft the initial state, then we build our maze and return it.

---

## Demo

<iframe data-src="/maze-demo" data-preload style="width: 1080px; height: 667px; border: none; overflow: hidden; display: block; margin: 0 auto;"></iframe>

Note: And to prove that it works, let's run that code.

---

## Rendering

Note: Now, all we've done so far is create a map of point objects. I haven't talked at all about how we render it. But the beauty of the web platform is that we have so many options.

---

```text
┌──┬┬───────────┐
│╶┐╵│╶┬─┬─┬─┐╶─┐│
│╷├╴├╴│╷│╷╵╷└─┐└┤
││└─┤┌┘│││┌┴─┐└┐│
│└┬┐╵├╴││└┘┌╴├╴││
├┐│└─┘╶┴┴──┤╶┤┌┘│
││└─┬─┐╶┬╴╷├╴│└╴│
│└┬╴│╷└─┤╶┴┤╶┼─╴│
│╶┤╶┘├─┐│┌┐└┐├─┐│
│╷└──┘╷│││└┐│╵╷││
│├┬───┤╵│╵╷│└┬┘├┤
││╵╶┬┐└─┴─┼┴╴│╶┘│
│└┬╴╵├─╴┌╴│╶─┴──┤
├┐│┌─┤╶─┤╶┴┬──┐╷│
││└┘╷└─┐└┬╴│┌╴│└┤
│└──┴─╴└╴│╶┘│╶┴╴│
└────────┴──┴───┘
```

Note: For example, I can create a unicode renderer and `console.log()` the output—like I do in the source code of my blog posts.

---

<figure class="maze-diagram">
 <img alt="" src="/svg-render-16x16.svg" />
</figure>

Note: But we can also render these as SVG.

---

## Could we render an accessible maze?

Note: One final challenge I'd like to leave you with is that neither this SVG rendering or the text rendering is accessible. It's not going to make sense to anyone using assistive technologies unless they're sighted. Is there a way we could do better?

---

```javascript
const doorsDescription = (doors, room) => {
  const prefix = `${doors.size === 1 ? 'There is a door' : 'There are doors'} to the `;
  const dirs = doors.map((door) => directionToString.get(subtractPoint(door)(room)));
  return prefix + dirs.set(-1, (doors.size > 1 ? 'and ' : '') + dirs.get(-1)).join(', ');
};

export const roomsToList = (rooms) => (
  '<ul class="room-list">' +
  rooms
    .sortBy((_, { x, y }) => Math.sqrt(x ** 2 + y ** 2))
    .map(
      (doors, room) =>
        `<li tabindex="0" class="maze-room" id="room-${room.x}-${room.y}">
        <p>Room ${room.x},${room.y}</p>
        <p>${doorsDescription(doors, room)}.</p>
        </li>`,
    )
    .join('\n') +
  '</ul>'
);
```

Note: One simple thing we could try is creating a list of all the rooms as HTML. It's not pretty, but it does contain all the information in the maze.

---

```html
<div class="accessibleMaze">
  <ul class="room-list">
    <li tabindex="0" class="maze-room" id="room-0-0">
      <p>Room 0,0</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-0">
      <p>Room 1,0</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-1">
      <p>Room 0,1</p>
      <p>There are doors to the east, north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-1">
      <p>Room 1,1</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-2">
      <p>Room 0,2</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-0">
      <p>Room 2,0</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-2">
      <p>Room 1,2</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-1">
      <p>Room 2,1</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-2">
      <p>Room 2,2</p>
      <p>There is a door to the east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-0">
      <p>Room 3,0</p>
      <p>There is a door to the south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-3">
      <p>Room 0,3</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-3">
      <p>Room 1,3</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-1">
      <p>Room 3,1</p>
      <p>There are doors to the west, north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-2">
      <p>Room 3,2</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-3">
      <p>Room 2,3</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-4">
      <p>Room 0,4</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-0">
      <p>Room 4,0</p>
      <p>There are doors to the east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-4">
      <p>Room 1,4</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-1">
      <p>Room 4,1</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-3">
      <p>Room 3,3</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-4">
      <p>Room 2,4</p>
      <p>There is a door to the south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-2">
      <p>Room 4,2</p>
      <p>There are doors to the east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-4">
      <p>Room 3,4</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-0">
      <p>Room 5,0</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-5">
      <p>Room 0,5</p>
      <p>There is a door to the south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-3">
      <p>Room 4,3</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-5">
      <p>Room 1,5</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-1">
      <p>Room 5,1</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-2">
      <p>Room 5,2</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-5">
      <p>Room 2,5</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-4">
      <p>Room 4,4</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-5">
      <p>Room 3,5</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-3">
      <p>Room 5,3</p>
      <p>There is a door to the east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-6">
      <p>Room 0,6</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-0">
      <p>Room 6,0</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-6">
      <p>Room 1,6</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-1">
      <p>Room 6,1</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-6">
      <p>Room 2,6</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-2">
      <p>Room 6,2</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-4">
      <p>Room 5,4</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-5">
      <p>Room 4,5</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-6">
      <p>Room 3,6</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-3">
      <p>Room 6,3</p>
      <p>There are doors to the south, north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-0">
      <p>Room 7,0</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-7">
      <p>Room 0,7</p>
      <p>There are doors to the south, north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-7">
      <p>Room 1,7</p>
      <p>There is a door to the west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-5">
      <p>Room 5,5</p>
      <p>There are doors to the east, north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-1">
      <p>Room 7,1</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-6">
      <p>Room 4,6</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-4">
      <p>Room 6,4</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-2">
      <p>Room 7,2</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-7">
      <p>Room 2,7</p>
      <p>There are doors to the east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-7">
      <p>Room 3,7</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-3">
      <p>Room 7,3</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-6">
      <p>Room 5,6</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-5">
      <p>Room 6,5</p>
      <p>There are doors to the east, south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-0">
      <p>Room 8,0</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-8">
      <p>Room 0,8</p>
      <p>There are doors to the east, north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-8">
      <p>Room 1,8</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-4">
      <p>Room 7,4</p>
      <p>There is a door to the north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-7">
      <p>Room 4,7</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-1">
      <p>Room 8,1</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-8">
      <p>Room 2,8</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-2">
      <p>Room 8,2</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-6">
      <p>Room 6,6</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-8">
      <p>Room 3,8</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-3">
      <p>Room 8,3</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-7">
      <p>Room 5,7</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-5">
      <p>Room 7,5</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-8">
      <p>Room 4,8</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-4">
      <p>Room 8,4</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-0">
      <p>Room 9,0</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-9">
      <p>Room 0,9</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-9">
      <p>Room 1,9</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-1">
      <p>Room 9,1</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-6">
      <p>Room 7,6</p>
      <p>There is a door to the west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-2">
      <p>Room 9,2</p>
      <p>There are doors to the north, east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-9">
      <p>Room 2,9</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-7">
      <p>Room 6,7</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-8">
      <p>Room 5,8</p>
      <p>There are doors to the east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-5">
      <p>Room 8,5</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-9">
      <p>Room 3,9</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-3">
      <p>Room 9,3</p>
      <p>There is a door to the north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-4">
      <p>Room 9,4</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-9">
      <p>Room 4,9</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-7">
      <p>Room 7,7</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-10">
      <p>Room 0,10</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-8">
      <p>Room 6,8</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-6">
      <p>Room 8,6</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-0">
      <p>Room 10,0</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-10">
      <p>Room 1,10</p>
      <p>There is a door to the south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-1">
      <p>Room 10,1</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-10">
      <p>Room 2,10</p>
      <p>There are doors to the east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-2">
      <p>Room 10,2</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-9">
      <p>Room 5,9</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-5">
      <p>Room 9,5</p>
      <p>There are doors to the south, east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-10">
      <p>Room 3,10</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-3">
      <p>Room 10,3</p>
      <p>There are doors to the east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-8">
      <p>Room 7,8</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-7">
      <p>Room 8,7</p>
      <p>There are doors to the east, south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-10">
      <p>Room 4,10</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-4">
      <p>Room 10,4</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-6">
      <p>Room 9,6</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-9">
      <p>Room 6,9</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-0">
      <p>Room 11,0</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-11">
      <p>Room 0,11</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-11">
      <p>Room 1,11</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-1">
      <p>Room 11,1</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-10">
      <p>Room 5,10</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-2">
      <p>Room 11,2</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-11">
      <p>Room 2,11</p>
      <p>There are doors to the north, west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-5">
      <p>Room 10,5</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-8">
      <p>Room 8,8</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-11">
      <p>Room 3,11</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-9">
      <p>Room 7,9</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-7">
      <p>Room 9,7</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-3">
      <p>Room 11,3</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-10">
      <p>Room 6,10</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-6">
      <p>Room 10,6</p>
      <p>There is a door to the north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-4">
      <p>Room 11,4</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-11">
      <p>Room 4,11</p>
      <p>There is a door to the south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-12">
      <p>Room 0,12</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-0">
      <p>Room 12,0</p>
      <p>There are doors to the south, west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-12">
      <p>Room 1,12</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-8">
      <p>Room 9,8</p>
      <p>There is a door to the south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-9">
      <p>Room 8,9</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-1">
      <p>Room 12,1</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-11">
      <p>Room 5,11</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-5">
      <p>Room 11,5</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-12">
      <p>Room 2,12</p>
      <p>There are doors to the east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-2">
      <p>Room 12,2</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-10">
      <p>Room 7,10</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-7">
      <p>Room 10,7</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-12">
      <p>Room 3,12</p>
      <p>There are doors to the north, west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-3">
      <p>Room 12,3</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-6">
      <p>Room 11,6</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-11">
      <p>Room 6,11</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-12">
      <p>Room 4,12</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-4">
      <p>Room 12,4</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-9">
      <p>Room 9,9</p>
      <p>There are doors to the south, north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-10">
      <p>Room 8,10</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-8">
      <p>Room 10,8</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-12">
      <p>Room 5,12</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-0">
      <p>Room 13,0</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-13">
      <p>Room 0,13</p>
      <p>There is a door to the south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-5">
      <p>Room 12,5</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-13">
      <p>Room 1,13</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-11">
      <p>Room 7,11</p>
      <p>There are doors to the south, east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-7">
      <p>Room 11,7</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-1">
      <p>Room 13,1</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-2">
      <p>Room 13,2</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-13">
      <p>Room 2,13</p>
      <p>There is a door to the north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-13">
      <p>Room 3,13</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-3">
      <p>Room 13,3</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-12">
      <p>Room 6,12</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-6">
      <p>Room 12,6</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-10">
      <p>Room 9,10</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-9">
      <p>Room 10,9</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-8">
      <p>Room 11,8</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-4">
      <p>Room 13,4</p>
      <p>There are doors to the east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-13">
      <p>Room 4,13</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-11">
      <p>Room 8,11</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-12">
      <p>Room 7,12</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-7">
      <p>Room 12,7</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-13">
      <p>Room 5,13</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-5">
      <p>Room 13,5</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-14">
      <p>Room 0,14</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-0">
      <p>Room 14,0</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-14">
      <p>Room 1,14</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-1">
      <p>Room 14,1</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-14">
      <p>Room 2,14</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-10">
      <p>Room 10,10</p>
      <p>There is a door to the north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-2">
      <p>Room 14,2</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-11">
      <p>Room 9,11</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-9">
      <p>Room 11,9</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-14">
      <p>Room 3,14</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-6">
      <p>Room 13,6</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-13">
      <p>Room 6,13</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-3">
      <p>Room 14,3</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-12">
      <p>Room 8,12</p>
      <p>There are doors to the east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-8">
      <p>Room 12,8</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-14">
      <p>Room 4,14</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-4">
      <p>Room 14,4</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-13">
      <p>Room 7,13</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-7">
      <p>Room 13,7</p>
      <p>There is a door to the east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-14">
      <p>Room 5,14</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-10">
      <p>Room 11,10</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-11">
      <p>Room 10,11</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-5">
      <p>Room 14,5</p>
      <p>There is a door to the east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-12">
      <p>Room 9,12</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-0">
      <p>Room 15,0</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-15">
      <p>Room 0,15</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-9">
      <p>Room 12,9</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-1">
      <p>Room 15,1</p>
      <p>There is a door to the north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-15">
      <p>Room 1,15</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-2">
      <p>Room 15,2</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-15">
      <p>Room 2,15</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-14">
      <p>Room 6,14</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-6">
      <p>Room 14,6</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-8">
      <p>Room 13,8</p>
      <p>There are doors to the east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-13">
      <p>Room 8,13</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-3">
      <p>Room 15,3</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-15">
      <p>Room 3,15</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-4">
      <p>Room 15,4</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-15">
      <p>Room 4,15</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-11">
      <p>Room 11,11</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-12">
      <p>Room 10,12</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-10">
      <p>Room 12,10</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-14">
      <p>Room 7,14</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-7">
      <p>Room 14,7</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-5">
      <p>Room 15,5</p>
      <p>There are doors to the south, west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-15">
      <p>Room 5,15</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-13">
      <p>Room 9,13</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-9">
      <p>Room 13,9</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-14">
      <p>Room 8,14</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-8">
      <p>Room 14,8</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-6">
      <p>Room 15,6</p>
      <p>There are doors to the west, south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-15">
      <p>Room 6,15</p>
      <p>There are doors to the north, west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-12">
      <p>Room 11,12</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-11">
      <p>Room 12,11</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-10">
      <p>Room 13,10</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-13">
      <p>Room 10,13</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-7">
      <p>Room 15,7</p>
      <p>There are doors to the north, west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-15">
      <p>Room 7,15</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-14">
      <p>Room 9,14</p>
      <p>There are doors to the east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-9">
      <p>Room 14,9</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-12">
      <p>Room 12,12</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-8">
      <p>Room 15,8</p>
      <p>There are doors to the north, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-15">
      <p>Room 8,15</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-13">
      <p>Room 11,13</p>
      <p>There are doors to the south, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-11">
      <p>Room 13,11</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-14">
      <p>Room 10,14</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-10">
      <p>Room 14,10</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-9">
      <p>Room 15,9</p>
      <p>There is a door to the north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-15">
      <p>Room 9,15</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-12">
      <p>Room 13,12</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-13">
      <p>Room 12,13</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-14">
      <p>Room 11,14</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-11">
      <p>Room 14,11</p>
      <p>There are doors to the east, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-10">
      <p>Room 15,10</p>
      <p>There is a door to the south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-15">
      <p>Room 10,15</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-13">
      <p>Room 13,13</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-14">
      <p>Room 12,14</p>
      <p>There are doors to the east, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-12">
      <p>Room 14,12</p>
      <p>There are doors to the south, west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-11">
      <p>Room 15,11</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-15">
      <p>Room 11,15</p>
      <p>There are doors to the west, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-14">
      <p>Room 13,14</p>
      <p>There are doors to the north, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-13">
      <p>Room 14,13</p>
      <p>There are doors to the south, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-12">
      <p>Room 15,12</p>
      <p>There are doors to the west, and south.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-15">
      <p>Room 12,15</p>
      <p>There are doors to the north, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-14">
      <p>Room 14,14</p>
      <p>There are doors to the east, and north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-13">
      <p>Room 15,13</p>
      <p>There is a door to the north.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-15">
      <p>Room 13,15</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-14">
      <p>Room 15,14</p>
      <p>There are doors to the south, and west.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-15">
      <p>Room 14,15</p>
      <p>There are doors to the west, and east.</p>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-15">
      <p>Room 15,15</p>
      <p>There are doors to the west, and north.</p>
    </li>
  </ul>
</div>
```

Note: This is how the HTML comes out.

---

<iframe data-src="/accessible-maze-boring" style="width: 1080px; height: 667px; border: none; overflow: hidden; display: block; margin: 0 auto;"></iframe>

Note: And if we render it, it looks like so. Rather dull. But perhaps we could enhance this a little bit by adding links to adjacent rooms. That way, you could navigate through the list using your keyboard.

---

```html
<div class="accessibleMaze">
  <ul class="room-list">
    <li tabindex="0" class="maze-room" id="room-0-0">
      <p>Room 0,0</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-0-1" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-1-0" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-0">
      <p>Room 1,0</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-0-0" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-2-0" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-1">
      <p>Room 0,1</p>
      <p>There are doors to the east, north, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-1-1" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-0-0" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-0-2" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-1">
      <p>Room 1,1</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-1-2" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-0-1" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-2">
      <p>Room 0,2</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-0-1" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-0-3" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-0">
      <p>Room 2,0</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-1-0" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-2-1" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-2">
      <p>Room 1,2</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-1-3" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-1-1" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-1">
      <p>Room 2,1</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-2-0" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-3-1" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-2">
      <p>Room 2,2</p>
      <p>There is a door to the east.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-3-2" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-0">
      <p>Room 3,0</p>
      <p>There is a door to the south.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-3-1" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-3">
      <p>Room 0,3</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-0-2" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-0-4" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-3">
      <p>Room 1,3</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-2-3" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-1-2" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-1">
      <p>Room 3,1</p>
      <p>There are doors to the west, north, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-2-1" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-3-0" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-3-2" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-2">
      <p>Room 3,2</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-3-1" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-2-2" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-3">
      <p>Room 2,3</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-3-3" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-1-3" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-4">
      <p>Room 0,4</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-0-3" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-1-4" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-0">
      <p>Room 4,0</p>
      <p>There are doors to the east, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-5-0" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-4-1" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-4">
      <p>Room 1,4</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-0-4" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-1-5" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-1">
      <p>Room 4,1</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-4-0" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-5-1" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-3">
      <p>Room 3,3</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-3-4" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-2-3" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-4">
      <p>Room 2,4</p>
      <p>There is a door to the south.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-2-5" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-2">
      <p>Room 4,2</p>
      <p>There are doors to the east, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-5-2" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-4-3" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-4">
      <p>Room 3,4</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-4-4" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-3-3" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-0">
      <p>Room 5,0</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-6-0" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-4-0" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-5">
      <p>Room 0,5</p>
      <p>There is a door to the south.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-0-6" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-3">
      <p>Room 4,3</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-4-2" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-4-4" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-5">
      <p>Room 1,5</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-1-4" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-1-6" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-1">
      <p>Room 5,1</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-4-1" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-5-2" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-2">
      <p>Room 5,2</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-5-1" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-4-2" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-5">
      <p>Room 2,5</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-3-5" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-2-4" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-4">
      <p>Room 4,4</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-4-3" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-3-4" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-5">
      <p>Room 3,5</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-4-5" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-2-5" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-3">
      <p>Room 5,3</p>
      <p>There is a door to the east.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-6-3" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-6">
      <p>Room 0,6</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-0-7" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-0-5" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-0">
      <p>Room 6,0</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-7-0" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-5-0" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-6">
      <p>Room 1,6</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-1-5" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-2-6" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-1">
      <p>Room 6,1</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-6-2" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-7-1" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-6">
      <p>Room 2,6</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-1-6" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-3-6" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-2">
      <p>Room 6,2</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-6-3" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-6-1" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-4">
      <p>Room 5,4</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-5-5" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-6-4" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-5">
      <p>Room 4,5</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-5-5" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-3-5" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-6">
      <p>Room 3,6</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-2-6" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-3-7" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-3">
      <p>Room 6,3</p>
      <p>There are doors to the south, north, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-6-4" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-6-2" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-5-3" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-0">
      <p>Room 7,0</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-8-0" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-6-0" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-7">
      <p>Room 0,7</p>
      <p>There are doors to the south, north, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-0-8" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-0-6" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-1-7" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-7">
      <p>Room 1,7</p>
      <p>There is a door to the west.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-0-7" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-5">
      <p>Room 5,5</p>
      <p>There are doors to the east, north, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-6-5" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-5-4" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-4-5" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-1">
      <p>Room 7,1</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-6-1" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-7-2" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-6">
      <p>Room 4,6</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-4-7" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-5-6" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-4">
      <p>Room 6,4</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-5-4" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-6-3" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-2">
      <p>Room 7,2</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-7-1" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-7-3" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-7">
      <p>Room 2,7</p>
      <p>There are doors to the east, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-3-7" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-2-8" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-7">
      <p>Room 3,7</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-3-6" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-2-7" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-3">
      <p>Room 7,3</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-7-2" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-7-4" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-6">
      <p>Room 5,6</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-4-6" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-5-7" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-5">
      <p>Room 6,5</p>
      <p>There are doors to the east, south, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-7-5" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-6-6" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-5-5" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-0">
      <p>Room 8,0</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-9-0" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-7-0" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-8">
      <p>Room 0,8</p>
      <p>There are doors to the east, north, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-1-8" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-0-7" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-0-9" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-8">
      <p>Room 1,8</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-1-9" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-0-8" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-4">
      <p>Room 7,4</p>
      <p>There is a door to the north.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-7-3" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-7">
      <p>Room 4,7</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-4-8" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-4-6" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-1">
      <p>Room 8,1</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-8-2" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-9-1" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-8">
      <p>Room 2,8</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-2-7" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-3-8" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-2">
      <p>Room 8,2</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-8-3" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-8-1" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-6">
      <p>Room 6,6</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-6-5" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-7-6" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-8">
      <p>Room 3,8</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-2-8" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-4-8" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-3">
      <p>Room 8,3</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-8-4" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-8-2" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-7">
      <p>Room 5,7</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-5-6" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-6-7" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-5">
      <p>Room 7,5</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-8-5" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-6-5" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-8">
      <p>Room 4,8</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-3-8" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-4-7" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-4">
      <p>Room 8,4</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-9-4" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-8-3" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-0">
      <p>Room 9,0</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-10-0" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-8-0" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-9">
      <p>Room 0,9</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-0-8" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-0-10" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-9">
      <p>Room 1,9</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-2-9" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-1-8" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-1">
      <p>Room 9,1</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-8-1" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-9-2" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-6">
      <p>Room 7,6</p>
      <p>There is a door to the west.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-6-6" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-2">
      <p>Room 9,2</p>
      <p>There are doors to the north, east, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-9-1" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-10-2" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-9-3" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-9">
      <p>Room 2,9</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-3-9" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-1-9" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-7">
      <p>Room 6,7</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-5-7" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-7-7" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-8">
      <p>Room 5,8</p>
      <p>There are doors to the east, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-6-8" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-5-9" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-5">
      <p>Room 8,5</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-9-5" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-7-5" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-9">
      <p>Room 3,9</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-4-9" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-2-9" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-3">
      <p>Room 9,3</p>
      <p>There is a door to the north.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-9-2" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-4">
      <p>Room 9,4</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-10-4" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-8-4" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-9">
      <p>Room 4,9</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-5-9" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-3-9" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-7">
      <p>Room 7,7</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-6-7" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-7-8" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-10">
      <p>Room 0,10</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-0-9" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-0-11" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-8">
      <p>Room 6,8</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-6-9" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-5-8" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-6">
      <p>Room 8,6</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-8-7" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-9-6" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-0">
      <p>Room 10,0</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-11-0" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-9-0" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-10">
      <p>Room 1,10</p>
      <p>There is a door to the south.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-1-11" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-1">
      <p>Room 10,1</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-10-2" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-11-1" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-10">
      <p>Room 2,10</p>
      <p>There are doors to the east, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-3-10" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-2-11" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-2">
      <p>Room 10,2</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-9-2" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-10-1" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-9">
      <p>Room 5,9</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-5-8" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-4-9" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-5">
      <p>Room 9,5</p>
      <p>There are doors to the south, east, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-9-6" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-10-5" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-8-5" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-10">
      <p>Room 3,10</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-4-10" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-2-10" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-3">
      <p>Room 10,3</p>
      <p>There are doors to the east, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-11-3" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-10-4" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-8">
      <p>Room 7,8</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-7-7" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-7-9" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-7">
      <p>Room 8,7</p>
      <p>There are doors to the east, south, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-9-7" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-8-8" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-8-6" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-10">
      <p>Room 4,10</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-5-10" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-3-10" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-4">
      <p>Room 10,4</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-10-3" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-9-4" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-6">
      <p>Room 9,6</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-8-6" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-9-5" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-9">
      <p>Room 6,9</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-6-10" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-6-8" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-0">
      <p>Room 11,0</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-12-0" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-10-0" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-11">
      <p>Room 0,11</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-0-10" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-0-12" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-11">
      <p>Room 1,11</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-2-11" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-1-10" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-1">
      <p>Room 11,1</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-10-1" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-11-2" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-10">
      <p>Room 5,10</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-5-11" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-4-10" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-2">
      <p>Room 11,2</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-11-1" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-12-2" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-11">
      <p>Room 2,11</p>
      <p>There are doors to the north, west, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-2-10" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-1-11" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-3-11" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-5">
      <p>Room 10,5</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-9-5" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-10-6" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-8">
      <p>Room 8,8</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-8-7" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-8-9" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-11">
      <p>Room 3,11</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-2-11" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-3-12" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-9">
      <p>Room 7,9</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-7-8" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-7-10" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-7">
      <p>Room 9,7</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-10-7" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-8-7" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-3">
      <p>Room 11,3</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-12-3" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-10-3" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-10">
      <p>Room 6,10</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-7-10" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-6-9" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-6">
      <p>Room 10,6</p>
      <p>There is a door to the north.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-10-5" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-4">
      <p>Room 11,4</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-11-5" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-12-4" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-11">
      <p>Room 4,11</p>
      <p>There is a door to the south.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-4-12" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-12">
      <p>Room 0,12</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-0-11" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-1-12" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-0">
      <p>Room 12,0</p>
      <p>There are doors to the south, west, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-12-1" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-11-0" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-13-0" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-12">
      <p>Room 1,12</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-0-12" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-1-13" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-8">
      <p>Room 9,8</p>
      <p>There is a door to the south.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-9-9" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-9">
      <p>Room 8,9</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-8-8" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-8-10" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-1">
      <p>Room 12,1</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-13-1" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-12-0" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-11">
      <p>Room 5,11</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-6-11" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-5-10" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-5">
      <p>Room 11,5</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-12-5" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-11-4" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-12">
      <p>Room 2,12</p>
      <p>There are doors to the east, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-3-12" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-2-13" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-2">
      <p>Room 12,2</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-11-2" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-13-2" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-10">
      <p>Room 7,10</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-7-9" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-6-10" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-7">
      <p>Room 10,7</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-10-8" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-9-7" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-12">
      <p>Room 3,12</p>
      <p>There are doors to the north, west, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-3-11" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-2-12" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-4-12" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-3">
      <p>Room 12,3</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-12-4" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-11-3" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-6">
      <p>Room 11,6</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-11-7" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-12-6" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-11">
      <p>Room 6,11</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-7-11" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-5-11" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-12">
      <p>Room 4,12</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-3-12" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-4-11" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-4">
      <p>Room 12,4</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-11-4" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-12-3" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-9">
      <p>Room 9,9</p>
      <p>There are doors to the south, north, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-9-10" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-9-8" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-10-9" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-10">
      <p>Room 8,10</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-8-9" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-9-10" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-8">
      <p>Room 10,8</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-11-8" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-10-7" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-12">
      <p>Room 5,12</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-5-13" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-6-12" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-0">
      <p>Room 13,0</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-12-0" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-14-0" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-13">
      <p>Room 0,13</p>
      <p>There is a door to the south.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-0-14" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-5">
      <p>Room 12,5</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-12-6" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-11-5" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-13">
      <p>Room 1,13</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-1-12" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-1-14" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-11">
      <p>Room 7,11</p>
      <p>There are doors to the south, east, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-7-12" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-8-11" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-6-11" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-7">
      <p>Room 11,7</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-12-7" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-11-6" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-1">
      <p>Room 13,1</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-14-1" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-12-1" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-2">
      <p>Room 13,2</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-12-2" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-13-3" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-13">
      <p>Room 2,13</p>
      <p>There is a door to the north.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-2-12" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-13">
      <p>Room 3,13</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-3-14" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-4-13" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-3">
      <p>Room 13,3</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-13-2" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-14-3" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-12">
      <p>Room 6,12</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-5-12" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-7-12" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-6">
      <p>Room 12,6</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-11-6" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-12-5" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-10">
      <p>Room 9,10</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-8-10" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-9-9" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-9">
      <p>Room 10,9</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-9-9" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-10-10" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-8">
      <p>Room 11,8</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-11-9" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-10-8" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-4">
      <p>Room 13,4</p>
      <p>There are doors to the east, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-14-4" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-13-5" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-13">
      <p>Room 4,13</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-3-13" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-4-14" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-11">
      <p>Room 8,11</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-7-11" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-9-11" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-12">
      <p>Room 7,12</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-6-12" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-7-11" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-7">
      <p>Room 12,7</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-12-8" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-11-7" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-13">
      <p>Room 5,13</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-6-13" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-5-12" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-5">
      <p>Room 13,5</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-13-4" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-13-6" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-14">
      <p>Room 0,14</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-0-15" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-0-13" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-0">
      <p>Room 14,0</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-13-0" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-15-0" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-14">
      <p>Room 1,14</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-1-13" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-2-14" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-1">
      <p>Room 14,1</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-14-2" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-13-1" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-14">
      <p>Room 2,14</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-1-14" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-3-14" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-10">
      <p>Room 10,10</p>
      <p>There is a door to the north.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-10-9" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-2">
      <p>Room 14,2</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-15-2" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-14-1" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-11">
      <p>Room 9,11</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-8-11" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-9-12" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-9">
      <p>Room 11,9</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-11-10" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-11-8" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-14">
      <p>Room 3,14</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-2-14" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-3-13" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-6">
      <p>Room 13,6</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-13-5" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-14-6" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-13">
      <p>Room 6,13</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-7-13" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-5-13" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-3">
      <p>Room 14,3</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-13-3" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-14-4" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-12">
      <p>Room 8,12</p>
      <p>There are doors to the east, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-9-12" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-8-13" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-8">
      <p>Room 12,8</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-12-9" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-12-7" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-14">
      <p>Room 4,14</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-4-13" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-5-14" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-4">
      <p>Room 14,4</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-14-3" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-13-4" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-13">
      <p>Room 7,13</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-7-14" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-6-13" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-7">
      <p>Room 13,7</p>
      <p>There is a door to the east.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-14-7" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-14">
      <p>Room 5,14</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-4-14" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-6-14" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-10">
      <p>Room 11,10</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-12-10" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-11-9" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-11">
      <p>Room 10,11</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-10-12" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-11-11" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-5">
      <p>Room 14,5</p>
      <p>There is a door to the east.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-15-5" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-12">
      <p>Room 9,12</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-9-11" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-8-12" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-0">
      <p>Room 15,0</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-14-0" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-15-1" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-0-15">
      <p>Room 0,15</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-1-15" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-0-14" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-9">
      <p>Room 12,9</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-13-9" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-12-8" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-1">
      <p>Room 15,1</p>
      <p>There is a door to the north.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-15-0" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-1-15">
      <p>Room 1,15</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-2-15" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-0-15" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-2">
      <p>Room 15,2</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-15-3" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-14-2" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-2-15">
      <p>Room 2,15</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-3-15" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-1-15" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-14">
      <p>Room 6,14</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-5-14" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-6-15" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-6">
      <p>Room 14,6</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-13-6" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-15-6" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-8">
      <p>Room 13,8</p>
      <p>There are doors to the east, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-14-8" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-13-9" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-13">
      <p>Room 8,13</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-8-12" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-9-13" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-3">
      <p>Room 15,3</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-15-4" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-15-2" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-3-15">
      <p>Room 3,15</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-4-15" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-2-15" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-4">
      <p>Room 15,4</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-15-5" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-15-3" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-4-15">
      <p>Room 4,15</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-5-15" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-3-15" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-11">
      <p>Room 11,11</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-10-11" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-12-11" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-12">
      <p>Room 10,12</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-11-12" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-10-11" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-10">
      <p>Room 12,10</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-12-11" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-11-10" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-14">
      <p>Room 7,14</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-8-14" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-7-13" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-7">
      <p>Room 14,7</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-15-7" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-13-7" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-5">
      <p>Room 15,5</p>
      <p>There are doors to the south, west, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-15-6" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-14-5" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-15-4" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-5-15">
      <p>Room 5,15</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-6-15" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-4-15" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-13">
      <p>Room 9,13</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-8-13" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-10-13" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-9">
      <p>Room 13,9</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-13-8" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-12-9" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-14">
      <p>Room 8,14</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-8-15" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-7-14" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-8">
      <p>Room 14,8</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-14-9" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-13-8" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-6">
      <p>Room 15,6</p>
      <p>There are doors to the west, south, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-14-6" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-15-7" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-15-5" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-6-15">
      <p>Room 6,15</p>
      <p>There are doors to the north, west, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-6-14" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-5-15" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-7-15" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-12">
      <p>Room 11,12</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-12-12" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-10-12" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-11">
      <p>Room 12,11</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-11-11" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-12-10" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-10">
      <p>Room 13,10</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-13-11" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-14-10" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-13">
      <p>Room 10,13</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-9-13" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-10-14" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-7">
      <p>Room 15,7</p>
      <p>There are doors to the north, west, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-15-6" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-14-7" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-15-8" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-7-15">
      <p>Room 7,15</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-6-15" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-8-15" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-14">
      <p>Room 9,14</p>
      <p>There are doors to the east, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-10-14" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-9-15" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-9">
      <p>Room 14,9</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-14-10" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-14-8" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-12">
      <p>Room 12,12</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-13-12" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-11-12" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-8">
      <p>Room 15,8</p>
      <p>There are doors to the north, and south.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-15-7" title="Take the north door">north</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-15-9" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-8-15">
      <p>Room 8,15</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-7-15" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-8-14" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-13">
      <p>Room 11,13</p>
      <p>There are doors to the south, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-11-14" title="Take the south door">south</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-12-13" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-11">
      <p>Room 13,11</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-14-11" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-13-10" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-14">
      <p>Room 10,14</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-10-13" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-9-14" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-10">
      <p>Room 14,10</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-13-10" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-14-9" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-9">
      <p>Room 15,9</p>
      <p>There is a door to the north.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-15-8" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-9-15">
      <p>Room 9,15</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-9-14" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-10-15" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-12">
      <p>Room 13,12</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-14-12" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-12-12" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-13">
      <p>Room 12,13</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-11-13" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-13-13" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-14">
      <p>Room 11,14</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-11-15" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-11-13" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-11">
      <p>Room 14,11</p>
      <p>There are doors to the east, and west.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-15-11" title="Take the east door">east</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-13-11" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-10">
      <p>Room 15,10</p>
      <p>There is a door to the south.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-15-11" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-10-15">
      <p>Room 10,15</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-9-15" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-11-15" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-13">
      <p>Room 13,13</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-12-13" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-13-14" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-14">
      <p>Room 12,14</p>
      <p>There are doors to the east, and south.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-13-14" title="Take the east door">east</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-12-15" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-12">
      <p>Room 14,12</p>
      <p>There are doors to the south, west, and east.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-14-13" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-13-12" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-15-12" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-11">
      <p>Room 15,11</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-15-10" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-14-11" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-11-15">
      <p>Room 11,15</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-10-15" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-11-14" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-14">
      <p>Room 13,14</p>
      <p>There are doors to the north, and west.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-13-13" title="Take the north door">north</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-12-14" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-13">
      <p>Room 14,13</p>
      <p>There are doors to the south, and north.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-14-14" title="Take the south door">south</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-14-12" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-12">
      <p>Room 15,12</p>
      <p>There are doors to the west, and south.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-14-12" title="Take the west door">west</a>
        </li>
        <li class="door door-south">
          <a class="doorLink" href="#room-15-13" title="Take the south door">south</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-12-15">
      <p>Room 12,15</p>
      <p>There are doors to the north, and east.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-12-14" title="Take the north door">north</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-13-15" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-14">
      <p>Room 14,14</p>
      <p>There are doors to the east, and north.</p>
      <ul class="door-list">
        <li class="door door-east">
          <a class="doorLink" href="#room-15-14" title="Take the east door">east</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-14-13" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-13">
      <p>Room 15,13</p>
      <p>There is a door to the north.</p>
      <ul class="door-list">
        <li class="door door-north">
          <a class="doorLink" href="#room-15-12" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-13-15">
      <p>Room 13,15</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-12-15" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-14-15" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-14">
      <p>Room 15,14</p>
      <p>There are doors to the south, and west.</p>
      <ul class="door-list">
        <li class="door door-south">
          <a class="doorLink" href="#room-15-15" title="Take the south door">south</a>
        </li>
        <li class="door door-west">
          <a class="doorLink" href="#room-14-14" title="Take the west door">west</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-14-15">
      <p>Room 14,15</p>
      <p>There are doors to the west, and east.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-13-15" title="Take the west door">west</a>
        </li>
        <li class="door door-east">
          <a class="doorLink" href="#room-15-15" title="Take the east door">east</a>
        </li>
      </ul>
    </li>
    <li tabindex="0" class="maze-room" id="room-15-15">
      <p>Room 15,15</p>
      <p>There are doors to the west, and north.</p>
      <ul class="door-list">
        <li class="door door-west">
          <a class="doorLink" href="#room-14-15" title="Take the west door">west</a>
        </li>
        <li class="door door-north">
          <a class="doorLink" href="#room-15-14" title="Take the north door">north</a>
        </li>
      </ul>
    </li>
  </ul>
</div>
```

Note: So, we've now given each room a list of links that point to the adjacent rooms. They're kind of like doors. And notice how I've given each list item a `tabindex` property. That means it can take focus.

---

<iframe data-src="/accessible-maze-with-links" style="width: 1080px; height: 607.5px; border: none; overflow: hidden; display: block; margin: 0 auto;"></iframe>

Note: If we render that out, it looks like this.

---

```css
/* Accessible Maze Rendering
 * ------------------------------------------------------------------------------ */

.maze-room {
  box-sizing: border-box;
  list-style: none;
  margin: 0;
  width: 28em;
  height: 28em;
  background-image: url('./img/floor.png');
  background-size: 64px 64px;
  border-image: url('./img/walls.png');
  border-image-slice: 16;
  border-image-repeat: round;
  border-width: 64px;
  border-image-width: 64px;
  padding: 5em;
  position: absolute;
  left: -64em;
  top: 0;
}

.room-list:not(:has(:focus)) .maze-room:first-child,
.maze-room:focus,
.maze-room:has(:focus) {
  outline: none;
  left: 0;
}

.door {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  background: url('./img/dungeon-doors.png') transparent;
  background-size: 224px 224px;
}

.doorLink {
  display: block;
  width: 100%;
  height: 100%;
  text-align: center;
  background-repeat: no-repeat;
  overflow: hidden;
  text-indent: -99em;
}

.door-south {
  background-position: top center;
  height: 4em;
  width: calc(100% - 10em);
  bottom: 0;
  left: 5em;
}

.door-north {
  background-position: bottom center;
  height: 4em;
  width: calc(100% - 10em);
  top: 0;
  left: 5em;
}

.door-west {
  background-position: center right;
  width: 4em;
  height: calc(100% - 10em);
  top: 5em;
  left: 0;
}

.door-east {
  background-position: center left;
  width: 4em;
  height: calc(100% - 10em);
  top: 5em;
  right: 0;
}

#room-0-0::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 5em;
  left: 0;
  height: calc(100% - 10em);
  width: 4em;
  background: url('./img/dungeon-exits.png') center right no-repeat;
  background-size: 128px 88px;
}

.maze-room:last-child::after {
  content: ' ';
  display: block;
  position: absolute;
  top: 5em;
  right: 0;
  height: calc(100% - 10em);
  width: 4em;
  background: url('./img/dungeon-exits.png') center left no-repeat;
  background-size: 128px 88px;
}
```

Note: And now that we've made the list items focusable, perhaps we could add some CSS so that we only show the first room, or whichever list item is focussed. And, while we're playing with CSS, perhaps we could position the links around the text.

---

<iframe data-src="/accessible-maze" data-preload style="width: 448px; height: 448px; border: none; overflow: hidden; display: block; margin: 0 auto;"></iframe>
<p style="margin-top: 3em"><small style="font-size: 25%">Sprites by <a href="http://www.indiedb.com/games/instant-dungeon">Scott Matott</a> used under the Open Game Art license (OGA-BY-3.0).</small></p>

Note: Perhaps we could throw in some pixel art… and a random object or two. And suddenly you've got a game.

---

## So what?

---

## Is this the most performant way to create a maze?

---

## No.

---

## Is this the most memory-efficient way to create a maze?

---

## No.

---

## Why then?

Note: Two reasons.

---

## Because it helps you think differently

Note: 1. When we created that accessible version of the maze, that led to us creating a really interesting pixel-art rendering of the maze. All because we were looking at the problem with a different lens. Programming with immutable data structures and recursion is similar: It forces you to look at the problem in a different way.

---

## Because it's fun

Note: I called this talk the 'joy' of immutable data, recursion, and pure functions. Sometimes it's fun to just explore an idea and see where it takes you. Sometimes it's fun to create a maze, just for the heck of it. And, personally, I think with all that's going on in the world, we could use a bit more fun and joy in our lives.  

---

## Thank you

* <https://jrsinclair.com>
* [@jrsinclair@indieweb.social](https://indieweb.social/@jrsinclair)
* Book <https://jrsinclair.com/skeptics-guide>

Note: Thank you.