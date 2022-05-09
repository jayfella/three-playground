How to start
===
type:
- npm i
- npm run start

Controls
===
Click on the canvas to move the camera. Press ESC to stop looking.

WASD = move
Q/E = up/down

How To Use
===
The "game" is managed using states. States are a class that extend BaseAppState that can be added and removed at any time.
States are added at the start in src/root.tsx - including camera controls.

There are various examples in the src/examples directory in the form of states. Add and remove them in src/root.tsx
If you're extra ambitious, states can also be added and removed when you click something, do something... whenever.
States can be anything. It's a "state" of your game. They can be menus, loading screens, anything!
