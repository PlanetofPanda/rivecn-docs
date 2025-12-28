State Machines

# States

States are simply timeline animations that can play at any point in your state machine. A state could be as simple as changing the color and position of an object, or as complex as blending multiple timelines together.
There are a few types of states that you’ll end up using as you work with the State Machine, including Default States, Single animations, and Blend States. We’ll explore each of these below.

## [​](#default-states) Default States

The Default States are the states that, by default, are added to every State Machine.
![Default States](images/42815967-dd47-4da1-ba8a-4fc12f64d972.webp)

### [​](#entry-state) Entry State

The Entry State is the state that your State Machine will start from. You’ll notice that by default, your state machine will already have an animation attached to the Entry State, but you can change this animation at any time. Note that you can connect multiple animations to the Entry State if you need I.E. you want to build a switch that can start in either the on or off state.
![Using the Entry state](images/image_1.png)

### [​](#exit-state) Exit State

The Exit State tells the State Machine layer to stop playing. This niche state has uses when multiple layers are being used.

### [​](#any-state) Any State

Unlike normal states, states connected to the Any State can be played at any time, regardless of which state your state machine is in. Any States are great to use when you want to create an array of states that can be activated at any time, such as changing the skin of a character.
![Rating system using the Any state](images/image_2.png)

## [​](#animation-states) Animation States

Animation states include all states other than the default states added to a State Machine. These states will control the look and motion of your interactive content. There are three types of animation states; Single Animation, 1D blend, and Direct blend states.
To add a State to the Graph, you can drag and drop an animation from the Animations List directly onto the Graph. Notice that this will create a Single Animation state. You can change the state type using the inspector.
![Drop and drop State onto the Graph](images/image_3.png)
Additionally, you can right-click on the graph and create a blank state of any type with no associated timelines.
![Image](images/image_4.png)
Right-click to add State
To assign a timeline to a state, use the timeline dropdown in the inspector.

### [​](#single-animation-state) Single animation state

Any timeline that we create can be used as a single animation state. Depending on the type of animation we are using, the single animation state could be a one-shot, looping, or ping-pong state. In most cases, you’ll be using single animation states to create most of your state machines.

### [​](#blend-states) Blend states

A Blend State is any state that blends together two or more timeline animations. We use these states for content like loading bars, health systems, scrolling interactions, and dynamic face rigs.
There are two types of blend states; 1D and Direct Blend states.

#### [​](#1d-blend-state:) 1D Blend state:

A 1D Blend State allows us to mix multiple timelines together with a single numerical input. This state works by ramping up one animation and ramping down the other while you increase or decrease a number input. Note that this mixing is not linear, but is additive and could give you unexpected results.
![Health bar using Blend state](images/image_5.png)
**Configuring a 1D Blend State:**
You’ll want to start by creating a few timelines for your Blend state. Keep in mind that it’s often best to use timelines with only a few properties keyed. In this health bar example, only the X scale is keyed.
![Image](images/image_6.png)
Timelines for health bar
After adding a 1D Blend State to the graph, use the Inspector to configure the state.
![Add Blend state](images/image_7.png)
First, add the number input you want to drive the blend using the dropdown. If you haven’t created one yet, you’ll notice that nothing appears here.
![Create and add number input to Blend state](images/image_8.png)
The plus button that appears below the number input allows you to add timelines to your blend state. Use the dropdown to assign a specific timeline. Note that you can add as many timelines as you’d like.
![Add timelines to the Blend state](images/image_9.png)
Next, you need to define a numerical range that your blend state will work between. This particular blend works between 0 and 100.
![Image](images/image_10.png)
Notice that once you define the range, a graphic appears above the input dropdown, visually representing how your animations will mix. When the state machine is active, as you increase or decrease your input within the defined range, you’ll see a visual representation move across that graph, showing you the mix of your timelines.
![Blend State in action](images/image_11.png)

#### [​](#additive-blend-state:) Additive Blend state:

An Additive Blend state allows you to blend together multiple timelines using multiple number inputs. This allows us to create unique poses and facial positions by mixing multiple animations together. While working with an Additive Blend, you’ll either be mixing an animation by value or input. Read more below.
![Using Additive Blend for facial animations](images/image_12.png)
**Value vs Input blend**
When adding animations to an Additive blend state, you’ll be prompted to either add a Blend by Value animation or a Blend by Input animation.
![Adding timeline to Additive Blend](images/image_13.png)
A Blend by Value timeline can be thought of as the baseline animation, or default pose. This value is not tied to an input, so it can’t be used to control the state machine. Instead, this value describes its mix weighting.
An Input blend is an animation that is mixed with the default pose or motion via a number input. Each of your different Input blends should have their own number input.

## [​](#additional-state-options) Additional State Options

When you select a state on the State Machine Graph, you’ll have a number of options that you can change.
**Change state type**
The top three icons allow you to change the type of state. You can select from single animation, 1D blend, and Additive blend.
![Convert state type](images/image_14.png)
**Change animation**
You can use the dropdown to change which animation is assigned to the current state.
![Changing animation on a state](images/image_15.png)
**Speed**
You can alter the playback speed of a state by changing this value. Note that you can play animations forward with a positive value, and backward with a negative value.
![Change animation speed](images/image_16.png)
**Transitions**
You can see any transitions that leave from the selected state. You also have the option to ignore specific transitions by turning off the eye icon.

[Overview](/docs/editor/state-machine/state-machine)[Inputs](/docs/editor/state-machine/inputs)