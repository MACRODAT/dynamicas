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
	ANY = '',
	PLA = 'PLA',
	ABS = 'ABS',
	PETG = 'PETG',
	NYLON = 'NYLON',
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

  type User = {
	firstname: string;
	lastname: string;
	avatar: string;
	loginDate: Date;
	loggedIn: boolean;
	email: string;
	uid: string;
  }

  export type {
	Point, Shape, User
  }
  export {
	ShapeName, JoiningMethod, MaterialType, AirfoilType
  }