import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import { Form, Tooltip, OverlayTrigger } from 'react-bootstrap';


const Priorities: React.FC<States> = (state: States) => {

	const dispatch = useDispatch();

	const [priorities, setPriorities] = useState({
		maneuverability: 3,
		stability: 3,
		payload: 3,
		speed: 3,
		endurance: 3,
		stallBehavior: 3,
		manufacturability: 3,
	  });
	
	  const handleSliderChange = (e: any) => {
		const { name, value } = e.target;
		setPriorities((prev) => ({
		  ...prev,
		  [name]: Number(value),
		}));
	  };
	
	  const renderTooltip = (text: any) => (
		<Tooltip>{text}</Tooltip>
	  );
	
	  return (
		<Form>
		  <Form.Group>
			<Form.Label>Maneuverability</Form.Label>
			<OverlayTrigger
			  placement="right"
			  overlay={renderTooltip("Higher values favor sharper turning and agility, affecting stability margins.")}
			>
			  <Form.Range
				name="maneuverability"
				min="1"
				max="5"
				value={priorities.maneuverability}
				onChange={handleSliderChange}
			  />
			</OverlayTrigger>
		  </Form.Group>
	
		  <Form.Group>
			<Form.Label>Stability</Form.Label>
			<OverlayTrigger
			  placement="right"
			  overlay={renderTooltip("Increases stability by adjusting center of gravity and damping, affecting maneuverability.")}
			>
			  <Form.Range
				name="stability"
				min="1"
				max="5"
				value={priorities.stability}
				onChange={handleSliderChange}
			  />
			</OverlayTrigger>
		  </Form.Group>
	
		  <Form.Group>
			<Form.Label>Payload Carry Capacity</Form.Label>
			<OverlayTrigger
			  placement="right"
			  overlay={renderTooltip("Higher values increase payload capability, impacting lift and drag characteristics.")}
			>
			  <Form.Range
				name="payload"
				min="1"
				max="5"
				value={priorities.payload}
				onChange={handleSliderChange}
			  />
			</OverlayTrigger>
		  </Form.Group>
	
		  <Form.Group>
			<Form.Label>Max Speed</Form.Label>
			<OverlayTrigger
			  placement="right"
			  overlay={renderTooltip("Higher values improve speed by optimizing lift-to-drag ratios, reducing payload capacity.")}
			>
			  <Form.Range
				name="speed"
				min="1"
				max="5"
				value={priorities.speed}
				onChange={handleSliderChange}
			  />
			</OverlayTrigger>
		  </Form.Group>
	
		  <Form.Group>
			<Form.Label>Endurance (Time in Air)</Form.Label>
			<OverlayTrigger
			  placement="right"
			  overlay={renderTooltip("Higher values increase fuel efficiency and glide ratio, affecting max speed and weight.")}
			>
			  <Form.Range
				name="endurance"
				min="1"
				max="5"
				value={priorities.endurance}
				onChange={handleSliderChange}
			  />
			</OverlayTrigger>
		  </Form.Group>
	
		  <Form.Group>
			<Form.Label>Stall Behavior</Form.Label>
			<OverlayTrigger
			  placement="right"
			  overlay={renderTooltip("Affects stall angle and control at low speeds, balancing between safety and performance.")}
			>
			  <Form.Range
				name="stallBehavior"
				min="1"
				max="5"
				value={priorities.stallBehavior}
				onChange={handleSliderChange}
			  />
			</OverlayTrigger>
		  </Form.Group>
	
		  <Form.Group>
			<Form.Label>Manufacturability</Form.Label>
			<OverlayTrigger
			  placement="right"
			  overlay={renderTooltip("Higher values improve ease of assembly and cost efficiency, affecting design complexity.")}
			>
			  <Form.Range
				name="manufacturability"
				min="1"
				max="5"
				value={priorities.manufacturability}
				onChange={handleSliderChange}
			  />
			</OverlayTrigger>
		  </Form.Group>
		</Form>
	  );
}

export default connect(allInterfaces)(Priorities)
