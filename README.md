# Dynamicas

What's dynamicas ?
It is a project aimed at providing tools for non-engineers to design and build their own drones. 

## Context

Dynamicas is intended as a general UAV design tool for hobbyists who may not possess the requisite acknowledge or tools to create their own designs. Today, we see drones produced in massive numbers, often by hobbyists who lack the acknowledge and only proceed to assemble parts. The aim here is to let this audience master some of the design aspects to achieve its intended usage. 

Dynamicas is intended as a general UAV design tool for hobbyists who may not possess the requisite acknowledge or tools to create their own designs. Today, we see drones produced in massive numbers, often by hobbyists who lack the acknowledge and only proceed to assemble parts. The aim here is to let this audience master some of the design aspects to achieve its intended usage. 

### Description

A UAV -drone- can be of several types: quadcopter, fixed wing… All these use airfoils to induce specific aerodynamic conditions permitting lift and flight.

Dynamicas, in its ultimate final shape, will be able to incorporate different aspects and regards in the design of the UAV, as indicated in this flowchart:

 

![Flowchart of Dynamicas](https://prod-files-secure.s3.us-west-2.amazonaws.com/5a11456f-1a4e-4d4e-a58f-1dc40ca94756/9c8c474f-1088-403c-96f1-a4d06092ae59/image.png)

Flowchart of Dynamicas

The **Structural** includes key points in material and process selection. Without going into much finer details, the user will select his intended manufacturing process (*3D print)* and the materials commonly associated with this process (*ABS, PLA).* Dynamicas will then induce several important engineering properties (roughness, material toughness, ductility, etc…). This wouldn’t involve the user typically and will be used in the latter phases of design.

The Dynamicas parameters tab will have all key considerations of flight, such as intended flight time, payload weight, type of airfoil and usage. It’s primordial for what will come next in the design process, thereby enabling recommandations in geometry, components, etc.

In **Geometry,** the user will be able to select few select models to analyse, such as NACA airfoils, or standard airfoils typically used in the industry. He may also create his own geometry, but this will limit some of the functionality of the software. Also, the user will be able to place standard components in the geometry via a WYSIWYG interface, such as motors, servos, batteries, payloads, camera… Essentially, it’s a drag and drop system, where you start with the fuselage, wings, tail… and get a complete package.

Aerodynamics does as its name implies: It will analyse the aerodynamic performance of the airfoil or the geometry, and will be able to produce recommandations. This is, for now, the most evolved section of the software, as it will use its **own pre-cfd, meshing and cfd tools** as an investment in latter versions of the software. This alone is the job of many engineering in big aero companies, and successful designs will incorporate excellent geometries specifically tailored for the intended purpose.

Finally, if all steps are succesful, a report with:

- Flight parameters: Calculated using all the information provided, and will include detailed analysis of the flight expected. It will also produce recommandations to improve the geometry.
- Stability: this will analyse the dynamic response of the UAV to various conditions, and will include the specified geometry and components chosen (misplacement of motors, too much thrust…).
- Structural: This is the static analysis of the airfoil for various loads and conditions to answer different questions (such as: will the gears bear the load at landing?)

### First version

Dynamicas is set to achieve a tremendous goal, which cannot be attained in one go. It is plenty of work, and has to be divided into milestones achieved with upcoming version.

The first “alpha” version of the software will primarily focus on the aerodynamic aspect of Dynamicas.

- The structural tab can be implemented fully or partially
- Dynamicas Parameters will implement only “type of airfoil” under which only NACA geometries for winglets are available.
- Dynamicas Geometry will only display the preview -and meshed- airfoils.
- Dynamicas Aerodynamics will produce 2D analysis only.
- Dynamicas Results will only show calculated aerodynamic functions.

This version has several limitations, but will lay the backbone of the project so proper selection of the laying fondations will be key for the success of the project.

### Limitions of Alpha and Monetization plan

Beside the aforementioned limitations, we know that the required computational demands for -even- the first version will be awesome. 

Many question arise:

- What hosting platform is -initially- suitable?
- How do scale the project?
- What monetization plan can be implemented?

The plan here, for now, that Dynamicas will be **Freemium with Computational-Based Usage Limits.** Since it is the computational power needed that poses problems, the plan is to allow free users a certain amount, while paid users can harness more power. This, with proper planning and scaling, will ensure the host servers will not overload. Otherwise, a user (*even if he has exhausted his cpu limits)* will continue to use the software to design his UAV, but will have to wait for the next day to run his calculations. ****

The software will use React TS for its simplicity and available packages, Boostrap, Redux, etc. Python/C++ will run in the host servers.

### UX design

The software will use left panels stacked for each design aspect. Something along these lines:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/5a11456f-1a4e-4d4e-a58f-1dc40ca94756/4524435a-a71e-4293-b4c1-424ab8d7050c/image.png)