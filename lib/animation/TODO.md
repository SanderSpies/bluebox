Animator
---
- simply test with jest first
- register node and add specific animation details
  - handle transition and spring separately
- deal with changing surroundings
  - linear from 1 - 100, half way go to 0, then go to 100 again, change speed also every time
  - keep animating even if the layout around it changes
- add additive support at some point

Challenges:
- do as little as possible -> but what about the immutable tree :-/
- but what about changing relative layout... everything changes
rAF ->
- recalc all animation values
- change nodes only once
- only do 1 layoutNode call if relative animation is present
- only do 1 render call

Current idea:
- add isAnimating (by Transition or Spring) and isChildAnimating to relevant Components
- register node that animates with relevant info to animator
- if animator.animate function happens:
    - for all animations do a recalc first
    - efficiently recreate all nodes from top to animating nodes by using the isAnimating/isChildAnimating flags
    - do a layoutNode from top (should optimally perform layout calculations at some point...)
    - render webgl
    - and this should happen in 16.6 ms :-/
- update parent references via special parentReference node -> change all parent nodes at once if needed

- what about garbage?!


Optimize further:
- try to bundle drawArrays calls - but how?!
- try to minimize program switching
- reduce bind buffer calls
