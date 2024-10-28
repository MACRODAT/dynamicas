import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { States, allInterfaces } from '../../helpers'
import { Form } from 'react-bootstrap';
import { aircraftPriorities } from '../../types';
import { SET_PRIORITIES } from '../../store/parameters';


const Priorities: React.FC<States> = (state: States) => {

	const dispatch = useDispatch();

	const [priorities, setPriorities] = useState<aircraftPriorities>({
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

	  useEffect(() => {
		dispatch({
			type: SET_PRIORITIES,
			payload: priorities
		})
	  }, [priorities])
	
	  return (
		<div className='' style={{width: '100%', height: '100%', overflowY: 'auto'}}>
				<h4>Set priorities</h4>
				<p className='italic'>
					What's more relevant to you? Set your parameters, and we'll shape your aircraft for you. 
					Setting everything at the highest values would just mean equal consideration for all parameters,
					as they are competitive in nature. Therefore, <em>prioritize</em> and be conservative.
				</p>
				<Form>
					<Form.Group>
						<Form.Label className='bold'>Maneuverability</Form.Label>
						<p className='italic small'>
							Higher values favor sharper turning and agility, affecting stability margins.
						</p>
						<Form.Range
							name="maneuverability"
							min="1"
							max="5"
							value={priorities.maneuverability}
							onChange={handleSliderChange}
						/>
					</Form.Group>
				
					<Form.Group>
						<Form.Label className='bold'>Stability</Form.Label>
						<p className='italic small'>
						Increases stability by adjusting center of gravity and damping, affecting maneuverability.
						</p>
						<Form.Range
							name="stability"
							min="1"
							max="5"
							value={priorities.stability}
							onChange={handleSliderChange}
						/>
					</Form.Group>
				
					<Form.Group>
						<Form.Label className='bold'>Payload Carry Capacity</Form.Label>
						<p className='italic small'>
							Higher values increase payload capability, impacting lift and drag characteristics.
						</p>
						<Form.Range
							name="payload"
							min="1"
							max="5"
							value={priorities.payload}
							onChange={handleSliderChange}
						/>
					</Form.Group>
				
					<Form.Group>
						<Form.Label className='bold'>Max Speed</Form.Label>
						<p className='italic small'>
							Higher values improve speed by optimizing lift-to-drag ratios, reducing payload capacity.
						</p>
						<Form.Range
							name="speed"
							min="1"
							max="5"
							value={priorities.speed}
							onChange={handleSliderChange}
						/>
					</Form.Group>
				
					<Form.Group>
						<Form.Label className='bold'>Endurance (Time in Air)</Form.Label>
						<p className='italic small'>
							Higher values increase efficiency and glide ratio, affecting max speed and weight.
						</p>
						<Form.Range
							name="endurance"
							min="1"
							max="5"
							value={priorities.endurance}
							onChange={handleSliderChange}
						/>
					</Form.Group>
				
					<Form.Group>
						<Form.Label className='bold'>Stall Behavior</Form.Label>
						<p className='italic small'>
							Affects stall angle and control at low speeds, balancing between safety and performance.
						</p>
						<Form.Range
							name="stallBehavior"
							min="1"
							max="5"
							value={priorities.stallBehavior}
							onChange={handleSliderChange}
						/>
					</Form.Group>
				
					<Form.Group>
						<Form.Label className='bold'>Manufacturability</Form.Label>
						<p className='italic small'>
							Higher values improve ease of assembly and cost efficiency, affecting design complexity.
						</p>
						<Form.Range
							name="manufacturability"
							min="1"
							max="5"
							value={priorities.manufacturability}
							onChange={handleSliderChange}
						/>
					</Form.Group>
				</Form>
		</div>
	  );
}

export default connect(allInterfaces)(Priorities)
