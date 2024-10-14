// Point type
type Point = {
	x: number;
	y: number;
	z: number;
  };
  
  // Shape Enum
  enum ShapeName {
	Box = 'Box',
	Cone = 'Cone',
	Cylinder = 'Cylinder',
	Wing = 'Wing',
	Gear = 'Gear',
  }
  
  // Shape type
  type Shape = {
	name: ShapeName;
	location: Point;
	radius?: number;
	length?: number;
	thickness?: number;
	NACA?: string;
	chordLength?: number;
	wingSpan?: number;
	leadingEdgeFunction?: number[];
	trailingEdgeFunction?: number[];
  };
  
  // Structural Process actions
  enum JoiningMethod {
	Rivet = 'Rivet',
	Screw = 'Screw',
	Snap = 'Snap',
  }
  
  enum MaterialType {
	PlasticPLA = 'Plastic PLA',
	PlasticABS = 'Plastic ABS',
	Aluminum = 'Aluminum',
	Steel = 'Steel',
	Custom = 'Custom',
  }
  
  enum AirfoilType {
	Airfoil = 'airfoil',
	Wing = 'wing',
	FixedWing = 'fixed wing',
	Quadcopter = 'quadcopter',
  }

  export type {
	Point, Shape
  }
  export {
	ShapeName, JoiningMethod, MaterialType, AirfoilType
  }