## Make it practical

Note: I try to be practical when I'm writing or speaking. I want to give people tools they can use to make their coding lives better. So, instead of giving examples about adding numbers together, I talk about creating DOM elements and processing JSON data. Those things are practical, and I don't want to waste people's time on things they're not going to use.

---

## Mazes aren't practical

Note: Mazes—not so practical.  
Unless you're working in game development, it's unlikely that you're going to need a maze in your web app. So, in that sense, knowing how to build a maze is useless. You're never going to use it.

---

## Why mazes?

Note: Why am I here, then? Why bother telling you all about something you're never going to use?

---

## A Goldilocks problem

Note: The nice thing about generating mazes is that the problem is not too big, and not too small. An issue I often have is that people ask me for 'real world' examples. But the trouble with 'real world' examples is tha they're way more complex than you can reasonably talk about in a 25 minute presentation. But a maze is just complex enough to be interesting.

---

## And it's not a to do list

Note: And it's not a to do list

---

## Immutable data

## Recursion

Note: But we can build our maze in such a way that we'll learn about immutable data and recursion.

---

Note: So let's get into it.

---

## How do we build a maze?

Note: How then, do we build a maze?

---

![](/grid.svg)

Note: We start with a grid. This one is a 4 &times; 4 grid with 16 'rooms' and 'walls' between each room.

---

![Starting with a room in the middle](/starting-square.svg)

Note: We start by picking a room at random. I've picked one near the middle, but it could be any room in the grid.

---

Note: Then, we make a list of the adjoining rooms to the north, south, east, and west that _aren't_ already connected to another room.

---

Note: We pick one of those rooms at random, and we punch a hole through the wall connecting those two rooms.

---

Note: Then, we repeat that process for the room we've just connected. This time, we have only three directions to choose from. This is because the room to the west is connected to this one.

---

Note: And we keep doing this until we reach a room where there are no more directions to choose from. Once we get there, then we backtrack one square and start again.

---

Note: We keep repeating this process until we have no unconnected squares left.

---

Note: Once that's done, we can pick an entry and an exit.

---

## Use your words

Note: Let's try and write that out in words, as an algorithm.

---

1. Start with a randomly selected room. <!-- .element: class="fragment" data-fragment-index="0" -->
2. Check how many rooms are left unconnected. If there are none left, we're done. <!-- .element: class="fragment" data-fragment-index="2" -->
3. Make a list of rooms adjacent to the current room, ot yet connected to another room. <!-- .element: class="fragment" data-fragment-index="3" -->
4. If all the adjacent rooms are already connected, go back one room and repeat from 2. <!-- .element: class="fragment" data-fragment-index="4" -->
5. Pick one of the unconnected adjacent rooms at random and connect it to this one. <!-- .element: class="fragment" data-fragment-index="5" -->
6. Move to the new room and repeat from 2. <!-- .element: class="fragment" data-fragment-index="6" -->

---

## Let's turn that into code

Note: We now know the basic approach. But we need ot turn that into code.  
To make life easier for ourselves, we're going to create a couple of immutable data structures… from scratch.

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

```javascript
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
```

Note: So we'll create a constructor that takes an x-value and a y-value.

---

Note: Putting that all together, we get a simple class.

```javascript
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

---

## This isn't immutable (yet)

Note: Now, so far, this is rather obvious and boring. And it's not immutable. So what we're going to do is hid this class away. We won't export it. Instead, we're going to create a cosntructor function,, `point()`, and that will be the only way to get yourself a point.

---

```javascript
// point.js
export function point(x, y) {
  // This is is how the function would work if it
  // were not immutable.
  const p = new Point(x, y);
  return p;
}
```

Note: It takes an x and a y coordinate, and returns as a Point object. But we're going to memoise this function. This means that if you call the function with the same inputs, you will get the _exact same_ output. Not two objects that happen to have the same values, but the same object.

---

```javascript
// point.js
const allPoints = new Map();
```

Note: Ironically, we make this happen by creating a mutable Map to act as a cache.

---

```javascript
// point.js
export function point(x, y) {
  const key = `${x}-${y}`;
  if (allPoints.has(key)) return allPoints.get(key);

  const newPoint = new Point(x, y);
  allPoints.set(key, newPoint);
  return newPoint;
}
```

Note: So, when a new call for a point comes in, we check to see if we've already seen this pair of numbers before. If not, we'll create a new one.

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

## Why Point?

Note: Now, at this point, you might be wondering, why did I call this class 'Point'? Why not 'Room'? Our algorithm is about rooms, not points.  
  
And in one sense, it doesn't matter. Whether it's called Point or Room, it still has two numbers representing coordinates. But if we call it Point, it may be a little less confusing if we use it for other things later.

---

## Another class

Note: Before we get to coding our algorithm, we need one more helper class. We'll call it Line.

---

## Line

Note: Line is what we'll use to represent connected rooms. It holds two pieces of data, both Points.

---

```javascript
// line.js
class Line {
  a;
  b;
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}
```

Note: So here's our constructor. We have point A, and point B.

---

```javascript
// line.js
export const line = (a, b) => {
    const str = `${a}-${b}`;
    if (allLines.has(str)) return allLines.get(str);
    const newLine = new Line(a, b);
    Object.freeze(newLine);
    allLines.set(str, newLine);
    return newLine;
};
```

Note: But, like Point, we're not going to export our class. Instead we're going to export a line constructor function. And, like we did for Point, we create a cache to memoize them, and freeze them on the way out.

---

## A subtle bug

Note: Except, there'a subtle bug in this code. Because we'll be using Line to represent a connection betwen two rooms.

---

```javascript
const pointA = point(3, 5);
const pointB = point(4, 5);

const lineAB = line(pointA, pointB);
const lineBA = line(pointB, pointA);

lineAB === lineBA // Should be true, but it's not.
```

Note: And, for our purposes, a connection from room A to B, is no different to a connection from room B to A. We don't care which direction the line goes.

---


```javascript
// point.js
  lte(b) {
    return this.y < b.y ||
      (this.y == b.y && this.x <= b.x);
  }
```

Note: To rectify this, we need to go back to our Point class and add in a way to compare points. We can already test whether they're equal. But we need a way to test if one point is smaller than another. We do that by adding a method for 'less than or equal to', or `lte()` for short.

---

```javascript [2,4]
// line.js
export const line = (a, b) => {
    const str = a.lte(b) ? `${a}-${b}` : `${b}-${a}`;
    if (allLines.has(str)) return allLines.get(str)!;
    const newLine = a.lte(b) ? new Line(a, b) : new Line(b, a);
    Object.freeze(newLine);
    allLines.set(str, newLine);
    return newLine;
};
```

Note: With that in place, we can adjust our line function to make sure the smallest point always comes first:

---

## Why?

Note: We now hae these two helper classes. And let's face it, they don't do much. So why do we bother? Why not just use a plain ol' JavaScript object? Zero code needed.

---

## ===

Note: In the future, we may not need to build immutable helper classes like this. But for now, they let us do something plain objects can't. I can compare them using triple equals.

---

```javascript
const objA = {x: 3, y: 5};
const objB = {x: 3, y: 5};
objA === objB; // false

const pointA = point(3, 5);
const pointB = point(3, 5);
pA === pB // true
```

Note: So let's try this. I'll create an object A, and I create an object B and compare them with `===`, and I get `false`. Bu t if I use my `point()` function, and I do `===`, I get `true`.

---

## So what?

Note: Again, you might legitimately ask, 'So what?' But things get interesting if I want to combine these with other data structures.

---

## Set

Note: Suppose I want to put these into a Set. I'm going to use the Set from the venerable Immutable.js library, but it will work just fine with the built-in JavaScript Set too.

---

```javascript [4-6|8-10]
import { Set } from 'immutable';
import { point } from './point';

const setWithObjects = Set([{x: 3, y: 5}, {x: 3, y: 5}]);
console.log(setWithObjects.toArray());
// Logs: [{x: 3, y: 5}, {x: 3, y: 5}]

const setWithPoints = Set([point(3, 5), point(3, 5)]);
console.log(setWithPoints.toArray());
// Logs: [{x: 3, y: 5}]
```

Note: If I put plain objects in the set, I get a set with two items. But if I have a Set using `point()` then I get just one. Which means I don't have to worry about there being duplicates in my set. And, as you know, that is the whole point of using a Set data structure.

---

## Map

Note: This _also_ means that i can use points as kes in a Map() object if I want.

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

Note: Again, I'm using Immutable.js Map, but  you can use the built-in JS class just fine too. And these features will come in handy once we start coding our algorithm.

---

## Algorithm

Note: So, let's get into writing our algorithm. We'll go over it one more time.

---

1. Start with a randomly selected room. <!-- .element: class="fragment" data-fragment-index="0" -->
2. Check how many rooms are left unconnected. If none are left, we're done. <!-- .element: class="fragment" data-fragment-index="1" -->
3. Make a list of rooms adjacent to the current room, not yet connected to another room. <!-- .element: class="fragment" data-fragment-index="2" -->
4. If this connected adjacent rooms list is empty, go back one room. <!-- .element: class="fragment" data-fragment-index="3" -->
5. Pick one of the rooms in the list at random and connect it. <!-- .element: class="fragment" data-fragment-index="4" -->
6. Move to this new room and repeat from 2. <!-- .element: class="fragment" data-fragment-index="5" -->

---

## Step 0

Note: But there's a step zero we need to complete first. We need a grid of unconnected rooms to start with. That is, we need to build the starting state for our algorithm. The two main things we need are:

---

1. A set of unconnected rooms <!-- .element: class="fragment" data-fragment-index="0" -->
2. The maze so far (a set of lines) <!-- .element: class="fragment" data-fragment-index="1" -->

---

## A set of unconnected rooms

Note: To help us build that set of unconnected rooms, we're going to do a little bit of math. For now, were going to assume we're only building square mazes.

---

$$ n ^ 2 $$

Note: So the total number of rooms will be $$n^2$$. So we can create an array with $$n^2$$ entries, and map over it to create a list of points. And we then put that into a Set.

---

## Set

And we're using a Set because sets make it a fast operation to ask "Do you have a particular entry?"

---

```javascript
import {Set, List} from 'immutable';

const roomList = new Array(n ** 2).fill(undefined).map(
  (_, i) => point(i % n, Math.floor(i / n))
);
const unconnectedRooms = Set(roomList);
```

---

## The maze so far

Note: For the maze so far, we simply create an empty list.

---

```javascript
const maze = List();
```

---

## One more thing…

Note: In our algorithm, we need to pick things at random from time to time. But in fucntional programming, something that's different every time you call it is considered 'impure'. So, we're going to quickly whip up our own pseudo random number generator to sidestep this problem.

---

```javascript
// random.js
const M = 2 ** 31;
const A = 110351245;
const C = 12345;

export function randomInt(seed) {
  return (A * seed + C) % M;
}
```

Note: This is a lot like the random number generator that most implementations of the C language use.

---

```javascript
export function randomInRange(seed, n) {
  const nextSeed = randomInt(seed);
  const randVal = Math.abs(nextSeed) % n;
  return [nextSeed, randVal];
}
```

Note: For our purposes though, we' mostly want a random number in a range between 0 and some number. So we'll use another helper. All it does is a little bit of math to make the random number fit the range we want. But, it also returns another number we can use as a seed for future generation.

---

```javascript
// maze.js
import {Set, List} from 'immutable';
import {randomInRange} from './random.js';

function buildInitialState(n, seed) {
  const roomList = new Array(n ** 2).fill(undefined).map(
    (_, i) => point(i % n, Math.floor(i / n))
  );
  const unconnected = Set(roomList);

  const mazeSoFar = List();

  const [newSeed, roomIdx] = randomInRange(n ** 2);
  const room = roomList[roomIdx];

  return [room, unconnected, mazeSoFar, newSeed];
}
```

Note: With that in place, we're now able to pick a starting room at random from the grid. And we can put that all into a single function that generates our initial state.

---

## Recursion

Noe: We're ready to code our actual algorithm. Now, we're going to do this using recursion. And recursion has a bad reputation.

---

## Scary

Note: People think it's scary. And often they think it's scary because it's easy to get yourself into a situation where you have infinite recursion. And that's fair. I undersand that.

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

```javascript [1-5|2]
let i = 10;
while (i > 0) {
  // Do something
  i--;
}
```

Note: If you're writing a while loop, for example, that repeats something 10 times, you make darn sure you've cot some counter, `i` and that you decrement it each time around the loop. That counter `i` is the state we're changing.  
  
And the termination condition is built in to while loops. In this case, `i > 0`.

---

## Thinking recursively

Note: When we're writing recursive algorithms, we pay attention to _the exact same things_. They simply happen to live in different locations.

---

## State goes in function parameters

Note: For a recursive function, the state we're changing always goes into the function parameters (assuming we're working with pure functions). And if you need to update more pieces of state, then you'll need more function parameters.

---

## Check exit conditions first

Note: Most of the time, when we write a recursive function, the first thing we do is check the exit condition. Much like how the exit condition is the first thing you write in a for-loop.

---

## What is the state for  our maze algorithm?

Note: Let's apply this to our maze algorithm. What state do we update as we go through the process?

---

1. Room <!-- .element: class="fragment" data-fragment-index="0" -->
2. Unconnected rooms <!-- .element: class="fragment" data-fragment-index="1" -->
3. The maze so far <!-- .element: class="fragment" data-fragment-index="2" -->
4. The random seed<!-- .element: class="fragment" data-fragment-index="3" -->

Note: At each step, we're considering a particular room. And the room we're considering changes, so that means it's part of our state.  
  
Another thing we do as we go along is we connect rooms together. As we do tht, we'll remove those connected rooms from the set of unconnected rooms.  
  
And, we'll also keep track of the rooms we connect. That is our 'maze so far'. And,  
  
There's one final piece of state that might not  be obvious. And that's our random number seed. So we'll pass that along for the next iteration of our algorithm.

---

```javascript
// maze.js
function buildMaze(room, unconnected, mazeSoFar, seed0) {
  // Maze building code goes here
}
```

---

## Exit condition

Note: Now, we said that the other important thing to pay attention to was the exit condition. And from our algorithm, we know what that is. So we can write it right away:

---

```javascript
// maze.js
function buildMaze(room, unconnected, mazeSoFar, seed0) {
  // Maze building code goes here
  if (unconnected.size === 0) {
    return /* ????? */;
  }
}
```

Note: We'll figure out _what_ we need to return in a moment. But at the very least, it's going to include our maze so far.

---

## Make a list of adjacent rooms not yet connected to another room

Note: With that in place, we've already implemented step 2 of our algorithm. Let's figure out step 3. We make a list of adjacent rooms that aren't yet connected. Let's write a function to do that. 

---

```javascript
// point.js
export const NORTH = p(0, -1);
export const EAST = p(1, 0);
export const SOUTH = p(0, 1);
export const WEST = p(-1, 0);
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

function getCandidates(room, unconnected) {
    return [NORTH, SOUTH, EAST, WEST]
        .map(addPoint(room))
        .filter((pt) => unconnected.has(pt));
}
```

Note: And with those in place, we can write a function to find unconnected adjacent rooms. We make an array of the four directions, map over it with `addPoint()` to get all the adjacent rooms. Then we filter out the rooms that are already connected.

---

```javascript [8-9]
// maze.js
function buildMaze(room, unconnected, mazeSoFar, seed0) {
  // Maze building code goes here
  if (unconnected.size === 0) {
    return /* ????? */;
  }

  // Find adjacent unconnected rooms.
  const candidates = getCandidates(room, unconnected);
}
```

Note: We can then use that in our main function.

---

## What if there are no adjacent unconnected rooms?

Note: Now, it might be that there are no unconnected rooms left adjacent to the current room. That means we've gone as far as we can along this path.

---

```javascript [10-12]
// maze.js
function buildMaze(room, unconnected, mazeSoFar, seed0) {
  // Maze building code goes here
  if (unconnected.size === 0) {
    return /* ????? */;
  }

  // Find adjacent unconnected rooms.
  const candidates = getCandidates(room, unconnected);
  if (candidates.length === 0) {
    return /* ????? */;
  }
}
```

Note: So, we're supposed to go back one room. In our case, that means we'll return. This becomes another exit condition. We'll come back and fill in that return value in a moment.

---

```javascript [14-18]
// maze.js
function buildMaze(room, unconnected, mazeSoFar, seed0) {
  // Maze building code goes here
  if (unconnected.size === 0) {
    return /* ????? */;
  }

  // Find adjacent unconnected rooms.
  const candidates = getCandidates(room, unconnected);
  if (candidates.length === 0) {
    return /* ????? */;
  }

  // Pick a room from the list of candidates.
  const [seed1, idx] = randomInRange(
    seed0,
    candidates.length
  );
}
```

Note: Next, we pick a room from the candidate list at random. That give us a new seed that we'll hold on to for now.

---

```javascript [6-12]
// maze.js
function buildMaze(room, unconnected, mazeSoFar, seed0) {
  
  // … Snip …

  // Move to the newly connected room.
  const someReturnValueWeHaventFiguredOut = buildMaze(
    candidates[idx],
    unconnected.remove(candidates[idx]),
    mazeSoFar.push(line(room, candidates[idx])),
    seed1,
  );
}
```

Note: So, we now know which room to move on to next. And we move on to the next room by calling our `buildMaze()` function recursively. We just have to make sure that we update each piece of state that we pass on. And again, we still need to figure out that return value.

---

## How do we go back one room?

Note: When we call that, our algorithm is going to go off and connect a bunch of rooms in a long branch off this one. But, there's a chance that when ti comes back, there still might be unconnected rooms adjacent to this one. So we make _another_ recursive call, but pass _the same room_ to try out the remaining candidates.

---

## But what's the state now?

Note: However, when we call the recursive function, we need to make sure we update the state. And for that, we need the previous call to tell us what the new state should be. In particular, we need 3 things:

---

1. The updated maze
2. Updated unconnected rooms
3. A new random seed

Note: We already know which room to pass along. But this list tells us what our return value from the function needs to be. Each time we call `buildMaze()` we will need to pass back each of these three values.

---

```javascript [7|14-16]
// maze.js
function buildMaze(room, unconnected, mazeSoFar, seed0) {
  
  // … Snip …

  // Move to the newly connected room.
  const [newMaze, newUnconnected, seed2] = buildMaze(
    candidates[idx],
    unconnected.remove(candidates[idx]),
    mazeSoFar.push(line(room, candidates[idx])),
    seed1,
  );
  
  // There may still be other directions we can connect
  // to this room, so we call buildMaze() again.
  return buildMaze(room, newMaze, newUnconnected, seed2);
}
```

Note: So we fill in those return values. And with those in place, we can make the final recursive call.

---

```javascript [5,11]
// maze.js
function buildMaze(room, unconnected, mazeSoFar, seed0) {
  // Maze building code goes here
  if (unconnected.size === 0) {
    return [unconnected, mazeSoFar, seed0];
  }

  // Find adjacent unconnected rooms.
  const candidates = getCandidates(room, unconnected);
  if (candidates.length === 0) {
    return [unconnected, mazeSoFar, seed0];
  }

  // Pick a room from the list of candidates.
  const [seed1, idx] = randomInRange(
    seed0,
    candidates.length
  );

  // Move to the newly connected room.
  const [newMaze, newUnconnected, seed2] = buildMaze(
    candidates[idx],
    unconnected.remove(candidates[idx]),
    mazeSoFar.push(line(room, candidates[idx])),
    seed1,
  );
  
  // There may still be other directions we can connect
  // to this room, so we call buildMaze() again.
  return buildMaze(room, newMaze, newUnconnected, seed2);
}
```

Note: If we go back and sort out the other return values then that's it. We have everything we need to build our maze.

---

## Wiring it all together

Note: All we need to do iw wire it up with the initial sate. We'll do that in a new function.

---

```javascript
// maze.js
export function maze(n, seed0) {
  const [room, unconnected, emptyMaze, seed1]
    = buildInitialState(n, seed0);

  const [maze] = buildMaze(
    room,
    unconnected,
    emptyMaze,
    seed1
  );

  return maze;
}
```

Note: We craft the initial state, then we build our maze and return it.

---

## Demo

<!-- Inserrt live demo -->

Note: And to prove that it works, let's run that code.

---

## Rendering

Note: Now, all we've done so fare is create a list of line objects. I haven't talked at all about how we render it. But the beauty of teh web platform is that we have so many options.

---

<!-- Insert rendered maze - unicode -->

Note: For example, I can create a unicode renderer and `console.log()` the output—like I do in the source code of my blog posts.

---

<!-- Insert source code for text renderer -->

Note: The source code for that looks like this. I won't go into the details now.

---

<!-- Insert rendered maze - svg -->

Note: But we can also render these as SVG.

---

<!-- Insert SVG rendering code  -->

Note: And I won't go into the details of this source code either. But it's even simpler than the text renderer.

---

## Could we render an accessible maze?

Note: One final challenge I'd like to leave you with is that neither this SVG rendering or the text rendering is accessible. It's not going to make sense to anyone using assistive technologies unless they're sighted. Is there a way we could do better?

---

```javascript
// Insert code for rending rooms in a list here
```

Note: One simple thing we could try is creating a list of all the rooms as HTML. It's not pretty, but it does contain all the information in the maze.

---

```javascript
// Insert code for adding links to adjacent rooms here
```

Note: Perhaps we could enhance this a little bit by adding links to adjacent rooms. That way, you could navigate through the list using your keyboard.

---

```css
/* Insert CSS code here */
```

Note: And now that we've made the list items focusable, perhaps we could add some CSS so that we only show the first room, or whichever list item is focussed. And, while we're playing with CSS, perhaps we could position the links around the text.

---

Note: Perhaps we could throw in some pixel art… and a random object or two. And suddenly you've got a game.