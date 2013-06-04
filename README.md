# Smashcraft

UCLA CS174A Final Project

Live demo: http://glentakahashi.github.io/smashcraft/

#### Authors

*   Alexander Ramirez <adr2370@gmail.com>
*   Steven La <mrstevenla@gmail.com>
*   Glen Takahashi <glen.takahashi@gmail.com>
*   Sarah Wong <kitsarwong@gmail.com>

#### Controls

*   Player 1
    *   *WSAD:* move
    *   *Q:* punch
    *   *E:* kick
    
*   Player 2
    *   *Arrow keys:* move
    *   *Enter:* punch
    *   *Shift:* kick
    
*   Player 3
    *   *YGHJ:* move
    *   *T:* punch
    *   *U:* kick
  
*   Player 4
    *   *PL;':* move
    *   *O:* punch
    *   *[:* kick

*   Settings
    *   *1-4:* set number of players
    *   *5-0:* start game with stage
    *   *Enter:* start game with stage ID 5

## Project Introduction

Smashcraft is a WebGL [Super Smash Bros.][1] clone in the style of
[Minecraft][2].

We tried to have our code as object-oriented as possible. There is a game
object, which contains an array of player objects and an array of platform
objects. Both of those objects types contain another object that has information
about the 3D model and its transformations.

Each game tick obtains data from the controller object and physics inside the
player object and alters the physics of each player accordingly.

## Project Result

### Advanced topics

*   Bump/normal mapping
*   Physics simulation
*   Collision detection
*   Model representation using a stack

### Not advanced topics, but fun anyway

*   Sound
*   Multiplayer

The platforms have normal mapping applied to them. A rotating point light shows
how the normals change across the texture. Each platform texture has a separate
normal map in tangent space that shows what the normals look like. We transform
those normals into object space to get the overall normal of a point on a tri.

Physics happens in two dimensions (YZ plane). The main components of this system
are acceleration (force) and velocity (momentum). Every action, such as jumping,
attacking, and moving, apply a force that will get added to the momentum.
Knockback formulas are loosely based on [Cathy J. Fitzpatrick's article][3]
about Super Smash Bros. Brawl's physics.

Collision detection is done with bounding volumes and points. Attacks are
represented by a bounding volume, and if that volume intersects the player
volume a hit is registered.

Models are represented in `models.js` and `player-models.js`. Each file contains
separate information about its verticies and components. Player models use the
stack extensively, since transformations are applied such that it the arms and
legs are attached to the rest of the body.

Sound is done using HTML5 audio and javascript. Multiplayer is handled in the
code for the game controller.

  [1]: http://en.wikipedia.org/wiki/Super_Smash_Bros.
  [2]: http://en.wikipedia.org/wiki/Minecraft
  [3]: https://cathyjf.com/brawl/brawl-dynamics-2009-01-18.pdf
