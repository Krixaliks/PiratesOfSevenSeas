//=============================================================================
// Plugin Name: Fireplace Stories
// Author: Winthorp Darkrites (Winter Dream Games Creator)
// Description: Select one of the stored decision based on your criteria
// Use: By using this plugin you accept the Terms of Use (https://drive.google.com/file/d/1l_GadoZh3ylSvRm4hAoT2WOUXTpePpHf/view?usp=sharing)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Stores decisions and randomly select them based on criteria
 * @author Winthorp Darkrites
 * @url https://ko-fi.com/winterdream
 *
 * @param storiesFreq
 * @text Default Frequency
 * @type number
 * @desc The base frequency (in %) of a story to start
 * @default 30
 * @min 0
 * @max 100
 *
 * @param storiesVar
 * @text Result Variable
 * @type number
 * @desc The variable that will return the chosen Story ID (0 if no story will be played)
 * @default 1
 * @min 1
 *
 * @param priorityVal
 * @text Priority Values
 * @type struct<prior>
 * @desc How the frequency changes with different priorities.
 * @default {"urgentPriority":"70","highPriority":"20","lowPriority":"-10","rarePriority":"-25"}
 *
 * ==== Plugin Commands ====
 * @command initiateFireplace
 * @text Fireplace Rest
 * @desc Initiate the stories selection process
 *
 * @command addStory
 * @text Add a Story
 * @desc Create a selectable story with your criteria.
 *
 * @arg newStory
 * @text Add a Story
 * @type struct<story>
 * @desc Create a selectable story with your criteria.
 *
 * @command removeStory
 * @text Remove a Story
 * @desc Remove a Story added to the Stories (if present).
 *
 * @param storyID
 * @text Story ID
 * @type number
 * @desc The ID of the Story to remove
 * @default 1
 * @min 1
 *
 * @command completeStory
 * @text Set Story to Complete
 * @desc Set as story as done, will not be selected and will allow chained stories (if any).
 *
 * @param storyID
 * @text Story ID
 * @type number
 * @desc The ID of the Story to remove
 * @default 1
 * @min 1
 *
 * @command reactivateStory
 * @text Set Story as not done
 * @desc If completed, it will reactivate the story.
 *
 * @param storyID
 * @text Story ID
 * @type number
 * @desc The ID of the Story to remove
 * @default 1
 * @min 1
 *
 * @help
 * This plugin is designed to randomly choose one of your stories/decisions
 * that you can add via Plugin Command "Add a Story".
 *
 * This stories (but can be any event, really) are designed to be randomly 
 * chosen based on different criteria you can set. You can add as many 
 * different criteria you want, there isn't a limit, but they all must 
 * return true for the story to be selected.
 *
 * The plugin has a base frequency value you can set in the plugin parameters 
 * as well as different prorities (default values are: 100% chance if urgent,
 * 50% chance if high priority, 30% chance if Default, 20% chance if low 
 * priority and 5% if rare priority. 
 * 
 * Once you launch the "Fireplace Rest" command the plugin will run a check on
 * all the stories, will exclude the already done stories, the chain stories that 
 * don't have their origin story done and the stories that don't meet the criteria,
 * then it will sort them by priority and run a random check on the percentage.
 * The FIRST story that meets all those checks will be set to a variable of 
 * your choice and flagged as done.
 *
 * The plugin stops at the first valid story. If you prefer to keep going until
 * a story fails set a loop in the RPG Maker editor to stop when the chosen 
 * variable returns 0 (0 means no story passed criteria or random percentage 
 * activation).
 *
 * USE UNIQUE ID FOR STORIES, "Add a Story" will NOT add a story if the same id 
 * is already been used
 *
 * You can find more scripts and games on my Ko-Fi page:
 * https://ko-fi.com/winterdream
 * and on my Itch.io page:
 * https://winterdreamgamescreator.itch.io/
 *
 * By using this plugin you accept the Terms of Use (https://drive.google.com/file/d/1l_GadoZh3ylSvRm4hAoT2WOUXTpePpHf/view?usp=sharing)
 */
 
 /*~struct~story:
 * @param id
 * @type number
 * @text Story ID
 * @desc The ID (that will be the variable number). MUST BE UNIQUE.
 * @default 1
 * @min 1
 *
 * @param priority
 * @text Priority
 * @type select
 * @option Urgent
 * @value pri1
 * @option High
 * @value pri2
 * @option Default
 * @value pri3
 * @option Low
 * @value pri4
 * @option Rare
 * @value pri5
 * @desc How much is likely to happen compared to the default
 * @default pri3
 *
 * @param condArray
 * @text Conditions
 * @type struct<cond>[]
 * @desc Choose your conditions.
 * @default []
 *
 * @param chain
 * @type number
 * @text Chained To
 * @desc If this story needs to happen AFTER another, write the other ID here. 0 will skip.
 * @default 0
 * @min 0
 *
 * @param modFreqFlag
 * @type boolean
 * @text Special Frequency?
 * @desc Do you want to use a special frequency? (will ignore priority)
 * @default false
 *
 * @param modFreq
 * @type number
 * @text Special Frequency Value
 * @desc The frequency that will be used skipping default parameters
 * @default 30
 * @min 1
 * @max 100
 *
 */
 /*~struct~cond:
 * @param switchArray
 * @text Switches
 * @type struct<switch>[]
 * @desc Set conditions by switch.
 * @default []
 *
 *
 * @param varArray
 * @text Variables
 * @type struct<var>[]
 * @desc Set conditions by variables.
 * @default []
 *
 * @param actorArray
 * @text Actors
 * @type struct<actor>[]
 * @desc Set conditions regarding Actors.
 * @default []
 *
 * @param itemArray
 * @text Items
 * @type struct<item>[]
 * @desc Set conditions regarding Items.
 * @default []
 *
 * @param weaponArray
 * @text Weapons
 * @type struct<weapon>[]
 * @desc Set conditions regarding Weapons.
 * @default []
 *
 * @param armorArray
 * @text Armors
 * @type struct<armor>[]
 * @desc Set conditions regarding Armors.
 * @default []
 *
 * @param goldArray
 * @text Gold
 * @type struct<gold>[]
 * @desc Set conditions regarding Gold.
 * @default []
 *
 */
 /*~struct~switch:
 * @param switchNum
 * @text Switch Number
 * @type number
 * @desc The switch number
 * @default 1
 * @min 1
 *
 * @param switchFlag
 * @type boolean
 * @text Switch Value
 * @desc Must be ON or OFF?
 * @default true
 *
 */
 /*~struct~var:
 * @param varNum
 * @text Variable Number
 * @type number
 * @desc The variable number (As for variable ID, not value)
 * @default 1
 * @min 1
 *
 * @param varCond
 * @text Value rule (only if checking number)
 * @type select
 * @option Equal to
 * @value varCond1
 * @option More than
 * @value varCond2
 * @option Less than
 * @value varCond3
 * @option More or equal than
 * @value varCond4
 * @option Less or equal than
 * @value varCond5
 * @desc What to check about the item number
 * @default varCond1
 *
 * @param varValue
 * @text Variable Value
 * @type number
 * @desc The variable value (As for variable value, not ID)
 * @default 0
 * @min 0
 *
 */
 /*~struct~actor:
 * @param actID
 * @text Actor
 * @type actor
 * @desc The actor ID (from database) we are referring to
 *
 * @param actCond
 * @text Condition
 * @type select
 * @option Is in party
 * @value actCond1
 * @option Is not in party
 * @value actCond2
 * @option HP value (see below)
 * @value actCond3
 * @option MP value (see below)
 * @value actCond4
 * @option TP value (see below)
 * @value actCond5
 * @option Level value (see below)
 * @value actCond6
 * @option XP value (see below)
 * @value actCond7
 * @desc Ther condition regarding the Actor
 * @default actCond1
 *
 * @param actNumCond
 * @text Value rule (for HP/MP/TP/Level/XP)
 * @type select
 * @option Equal to (absolute)
 * @value actNumCond1
 * @option More than (absolute)
 * @value actNumCond2
 * @option Less than (absolute)
 * @value actNumCond3
 * @option Equal to (percentage)
 * @value actNumCond4
 * @option More than (percentage)
 * @value actNumCond5
 * @option Less than (percentage)
 * @value actNumCond6
 * @desc What to check about HP/MP/TP/Lvl/XP (ignore if you choose to check if actor is/isn't in party)
 * @default actNumCond1
 *
 * @param actNumVal
 * @text Value (for HP/MP/TP/Lvl/XP)
 * @type number
 * @desc The value to check
 * @default 0
 * @min 0
 *
 */
 /*~struct~item:
 * @param itemID
 * @text Item
 * @type item
 * @desc The item ID (from database) we are referring to
 *
 * @param itemCond
 * @text Condition
 * @type select
 * @option Is in inventory
 * @value itemCond1
 * @option Is not in inventory
 * @value itemCond2
 * @option Has a specific number
 * @value itemCond3
 * @desc Ther condition regarding the Item
 * @default itemCond1
 *
 * @param itemNumCond
 * @text Value rule (only if checking number)
 * @type select
 * @option Equal to
 * @value itemNumCond1
 * @option More than
 * @value itemNumCond2
 * @option Less than
 * @value itemNumCond3
 * @desc What to check about the item number
 * @default itemNumCond1
 *
 * @param itemNumVal
 * @text Value
 * @type number
 * @desc The value to check
 * @default 0
 * @min 0
 *
 */
 /*~struct~weapon:
 * @param weaponID
 * @text Weapon
 * @type weapon
 * @desc The weapon ID (from database) we are referring to
 *
 * @param weaponCond
 * @text Condition
 * @type select
 * @option Is in inventory
 * @value weaponCond1
 * @option Is not in inventory
 * @value weaponCond2
 * @option Is equipped by...
 * @value weaponCond3
 * @option Is not equipped by...
 * @value weaponCond4
 * @option Has a specific number
 * @value weaponCond5
 * @desc Ther condition regarding the Weapon
 * @default weaponCond1
 *
 * @param weaponActID
 * @text ...this Actor
 * @type actor
 * @desc The actor ID (from database) that has (or not) the weapon equipeed
 *
 * @param weaponNumCond
 * @text Value rule (only if checking number)
 * @type select
 * @option Equal to
 * @value weaponNumCond1
 * @option More than
 * @value weaponNumCond2
 * @option Less than
 * @value weaponNumCond3
 * @desc What to check about the weapon number
 * @default weaponNumCond1
 *
 * @param weaponNumVal
 * @text Value
 * @type number
 * @desc The value to check
 * @default 0
 * @min 0
 *
 */
 /*~struct~armor:
 * @param armorID
 * @text Armor
 * @type armor
 * @desc The armor ID (from database) we are referring to
 *
 * @param armorCond
 * @text Condition
 * @type select
 * @option Is in inventory
 * @value armorCond1
 * @option Is not in inventory
 * @value armorCond2
 * @option Is equipped by...
 * @value armorCond3
 * @option Is not equipped by...
 * @value armorCond4
 * @option Got a specific number of this armor
 * @value armorCond5
 * @desc Ther condition regarding the Armor
 * @default armorCond1
 *
 * @param armorActID
 * @text ...this Actor
 * @type actor
 * @desc The actor ID (from database) that has (or not) the armor equipeed
 *
 * @param armorNumCond
 * @text Value rule (only if checking number)
 * @type select
 * @option Equal to
 * @value armorNumCond1
 * @option More than
 * @value armorNumCond2
 * @option Less than
 * @value armorNumCond3
 * @desc What to check about the armor number
 * @default armorNumCond1
 *
 * @param armorNumVal
 * @text Value
 * @type number
 * @desc The value to check
 * @default 0
 * @min 0
 *
 */
 /*~struct~gold:
 * @param goldNumCond
 * @text Gold Condition
 * @type select
 * @option Equal to
 * @value goldNumCond1
 * @option More than
 * @value goldNumCond2
 * @option Less than
 * @value goldNumCond3
 * @desc What to check about the gold number
 * @default goldNumCond1
 *
 * @param goldNumVal
 * @text Value
 * @type number
 * @desc The value to check
 * @default 0
 * @min 0
 *
 */
 /*~struct~prior:
 * @param urgentPriority
 * @text Urgent Priority
 * @type number
 * @desc The change in frequency (example 10 means 40% instead of 30% if default is 30%)
 * @default 70
 *
 * @param highPriority
 * @text High Priority
 * @type number
 * @desc The change in frequency (example 10 means 40% instead of 30% if default is 30%)
 * @default 20
 *
 * @param lowPriority
 * @text Low Priority
 * @type number
 * @desc The change in frequency (example 10 means 40% instead of 30% if default is 30%)
 * @default -10
 *
 * @param rarePriority
 * @text Rare Priority
 * @type number
 * @desc The change in frequency (example 10 means 40% instead of 30% if default is 30%)
 * @default -25
 *
 */
 
(function () {
	 
	// Plugin Parameters
	const parameters = PluginManager.parameters('WD_FireplaceStories');
	let storiesFreq = parseInt(parameters["storiesFreq"]) || 30;
	let storiesVar = parseInt(parameters["storiesVar"]) || 1;
	let priorityValues = JSON.parse(parameters["priorityVal"]);
	const propertiesToParse = ["urgentPriority", "highPriority", "lowPriority", "rarePriority"];
	for (const prop of propertiesToParse) {
	  priorityValues[prop] = parseInt(priorityValues[prop]);
	}
	
	// Main global variables
	let storiesArray = [];
	
	// Main function
	function storyTime() {
		// {id: 0, priority: "", conditions: [], chain: 0, modFreqFlag: false, modFreq: 0, done: false}
		let ongoingStories = [];
		let trimmedStories = [];
		$gameVariables.setValue(storiesVar, 0);
		
		//Load stories and it's not empty
		loadStories();
		if (storiesArray.length === 0) {
			return;
		}
		//Checks stories not completed
		for (let index = 0; index < storiesArray.length; index++) {
			const story = storiesArray[index];
			
			if (!story.done) {
				ongoingStories.push(story);
			}
		}
		//Checks if chained stories base condition is met (chainer is done)
		if (ongoingStories.length > 0) {
			for (let index = 0; index < ongoingStories.length; index++) {
				const story = ongoingStories[index];
				
				if (story.chain > 0) {
					let chainValid = false;
					const targetChain = story.chain;
					for (let i = 0; i < storiesArray.length; i++) {
						const chainerStory = storiesArray[i];
						
						if (chainerStory.id === targetChain) {
							if (chainerStory.done) {
								chainValid = true;
							}
						}
					}
					//Didn't found a valid criteria?
					if (!chainValid) {
						trimmedStories.push(index);
					}
				}
			}
			if (trimmedStories.length > 0) {
			  // Iterate in reverse order to avoid skipping elements
			  for (let j = trimmedStories.length - 1; j >= 0; j--) {
				ongoingStories.splice(trimmedStories[j], 1);
			  }
			}
		}
		//Checks conditions criteria via function 
		trimmedStories = [];
		if (ongoingStories.length > 0) {
			for (let index = 0; index < ongoingStories.length; index++) {
				const story = ongoingStories[index];
				const validCriteria = conditionsCriteriaChecker(story);
				
				if (!validCriteria) {
					trimmedStories.push(index);
				}
			}
			if (trimmedStories.length > 0) {
			  // Iterate in reverse order to avoid skipping elements
			  for (let j = trimmedStories.length - 1; j >= 0; j--) {
				ongoingStories.splice(trimmedStories[j], 1);
			  }
			}
		}
		//Now that chains and criteria have been checked, run the percentages
		if (ongoingStories.length > 0) {
			let orderedStories = [];
			for (let i = 0; i < ongoingStories.length; i++) {
				const story = ongoingStories[i];
				
				if (story.modFreqFlag) {
					orderedStories.push({id: story.id, freq: story.modFreq});
				} else {
					let storyFreq = 0;
					
					storyFreq += storiesFreq;
					switch (story.priority) {
						case "pri1":
							//Urgent 
							storyFreq += priorityValues.urgentPriority;
						break;
						
						case "pri2":
							//High 
							storyFreq += priorityValues.highPriority;
						break;
						
						case "pri3":
							//Default, no changes
						break;
						
						case "pri4":
							//Low
							storyFreq += priorityValues.lowPriority;
						break;
						
						case "pri5":
							//Rare
							storyFreq += priorityValues.rarePriority;
						break;
					}
					//Check that frequency isn't 0% or negative 
					if (storyFreq <= 0) {
						storyFreq = 1;
					}
					//Add to array
					orderedStories.push({id: story.id, freq: storyFreq});
				}
			}
			//Order stories by priority
			for (let i = 0; i < orderedStories.length; i++) {
				const story = orderedStories[i];
				
				if (story.freq >= getRandonPercentage()) {
					$gameVariables.setValue(storiesVar, story.id);
					for (let j = 0; j < storiesArray.length; j++) {
						if (storiesArray[j].id === story.id) {
							storiesArray[j].done = true;
						}
					}
					break;
				}
			}
		}
	}
	
	function conditionsCriteriaChecker(story) {
		let innerFlag = false;
		
		//If there are no criteria 
		if (story.conditions.length === 0) {
			return true;
		}
		
		//Actor Array criteria check
		if (story.conditions.actorArray.length > 0) {
			for (let i = 0; i < story.conditions.actorArray.length; i++) {
				const conditionsData = story.conditions.actorArray[i];
				
				//Check if a valid Actor as been selected (no 0, no NaN)
				if (conditionsData.actID > 0) {
					const partyMembers = $gameParty.members();
					const actorProperties = $gameActors.actor(conditionsData.actID);
					
					function actorMath(actualValue,maxValue,criteria) {
						switch (conditionsData.actNumCond) {
							case "actNumCond1":
								//Equal to Abs
								if (actualValue === criteria) {
									return true;
								} else {
									return false; 
								}
							break;
							
							case "actNumCond2":
								//More than Abs
								if (actualValue > criteria) {
									return true;
								} else {
									return false; 
								}
							break;
							
							case "actNumCond3":
								//Less than Abs
								if (actualValue < criteria) {
									return true;
								} else {
									return false; 
								}
							break;
							
							case "actNumCond4":
								//Equal to Percentage
								if (((actualValue/maxValue) * 100) === criteria) {
									return true;
								} else {
									return false; 
								}
							break;
							
							case "actNumCond5":
								//More than Percentage
								if (((actualValue/maxValue) * 100) > criteria) {
									return true;
								} else {
									return false; 
								}
							break;
							
							case "actNumCond6":
								//Less than Percentage
								if (((actualValue/maxValue) * 100) < criteria) {
									return true;
								} else {
									return false; 
								}
							break;
						}	
					}
					
					switch (conditionsData.actCond) {
						case "actCond1":
							//If Actor is in party
							innerFlag = false;
							for (let i = 0; i < partyMembers.length; i++) {
								if (partyMembers[i]._actorId === conditionsData.actID) {
									innerFlag = true;
								}
							}
							if (innerFlag) {
								//Continue
							} else {
								return false;
							}
						break;
						
						case "actCond2":
							//If Actor is not in party
							innerFlag = false;
							for (let i = 0; i < partyMembers.length; i++) {
								if (partyMembers[i]._actorId === conditionsData.actID) {
									innerFlag = true;
								}
							}
							if (!innerFlag) {
								//Continue
							} else {
								return false;
							}
						break;
						
						case "actCond3":
							//HP Value
							if (actorProperties) {
								innerFlag = actorMath(actorProperties._hp,actorProperties.mhp,conditionsData.actNumVal);
								if (!innerFlag) {
									return false;
								}
							}
						break;
						
						case "actCond4":
							//MP Value
							if (actorProperties) {
								innerFlag = actorMath(actorProperties._mp,actorProperties.mmp,conditionsData.actNumVal);
								if (!innerFlag) {
									return false;
								}
							}
						break;
						
						case "actCond5":
							//TP Value
							if (actorProperties) {
								innerFlag = actorMath(actorProperties._tp,actorProperties.tp,conditionsData.actNumVal);
								if (!innerFlag) {
									return false;
								}
							}
						break;
						
						case "actCond6":
							//Level Value
							if (actorProperties) {
								innerFlag = actorMath(actorProperties._level,99,conditionsData.actNumVal);
								if (!innerFlag) {
									return false;
								}
							}
						break;
						
						case "actCond7":
						//XP Value
						if (actorProperties) {
							innerFlag = actorMath(actorProperties.currentExp(),(actorProperties.currentExp() + actorProperties.nextRequiredExp()),conditionsData.actNumVal);
							if (!innerFlag) {
								return false;
							}
						}
						break;
					}
				}
			}
		}
		
		//Armor Array criteria check
		if (story.conditions.armorArray.length > 0) {
			for (let i = 0; i < story.conditions.armorArray.length; i++) {
				const conditionsData = story.conditions.armorArray[i];
				
				//Check if a valid Armor as been selected (no 0, no NaN)
				if (conditionsData.armorID > 0) {
					
					function armorMath(actualValue,criteria) {
						switch (conditionsData.armorNumCond) {
							case "armorNumCond1":
								//Equal to Abs
								if (actualValue === criteria) {
									return true;
								} else {
									return false; 
								}
							break;
							
							case "armorNumCond2":
								//More than Abs
								if (actualValue > criteria) {
									return true;
								} else {
									return false; 
								}
							break;
							
							case "armorNumCond3":
								//Less than Abs
								if (actualValue < criteria) {
									return true;
								} else {
									return false; 
								}
							break;
						}	
					}
					
					switch (conditionsData.armorCond) {
						case "armorCond1":
							//Is in inventory
							if ($gameParty.hasItem($dataArmors[conditionsData.armorID], true)) {
								//Continue
							} else {
								return false;
							}
						break;
						
						case "armorCond2":
							//Is not in inventory
							if ($gameParty.hasItem($dataArmors[conditionsData.armorID], true)) {
								return false;
							} else {
								//Continue
							}
						break;
						
						case "armorCond3":
							//Is equipped by...
							if (conditionsData.armorActID > 0) {
								if ($gameActors.actor(conditionsData.armorActID).hasArmor($dataArmors[conditionsData.armorID])) {
									//Continue
								} else {
									return false;
								}
							}
						break;
						
						case "armorCond4":
							//Is not equipped by...
							if (conditionsData.armorActID > 0) {
								if ($gameActors.actor(conditionsData.armorActID).hasArmor($dataArmors[conditionsData.armorID])) {
									return false;
								} else {
									//Continue
								}
							}
						break;
						
						case "armorCond5":
							//Got a specific number of this armor
							let armorCount = $gameParty.numItems($dataArmors[conditionsData.armorID]);
							for (let i = 1; i < $dataActors.length; i++) {
								if ($gameActors.actor(i).hasArmor($dataArmors[conditionsData.armorID])) {
									armorCount++;
								}
							}
							if (armorMath(armorCount,conditionsData.armorNumVal)) {
								//Continue
							} else {
								return false;
							}
						break;
					}
				}
			}
		}
		
		//Weapon Array criteria check
		if (story.conditions.weaponArray.length > 0) {
			for (let i = 0; i < story.conditions.weaponArray.length; i++) {
				const conditionsData = story.conditions.weaponArray[i];
				
				//Check if a valid Weapon as been selected (no 0, no NaN)
				if (conditionsData.weaponID > 0) {
					
					function weaponMath(actualValue,criteria) {
						switch (conditionsData.weaponNumCond) {
							case "weaponNumCond1":
								//Equal to Abs
								if (actualValue === criteria) {
									return true;
								} else {
									return false; 
								}
							break;
							
							case "weaponNumCond2":
								//More than Abs
								if (actualValue > criteria) {
									return true;
								} else {
									return false; 
								}
							break;
							
							case "weaponNumCond3":
								//Less than Abs
								if (actualValue < criteria) {
									return true;
								} else {
									return false; 
								}
							break;
						}	
					}
					
					switch (conditionsData.weaponCond) {
						case "weaponCond1":
							//Is in inventory
							if ($gameParty.hasItem($dataWeapons[conditionsData.weaponID], true)) {
								//Continue
							} else {
								return false;
							}
						break;
						
						case "weaponCond2":
							//Is not in inventory
							if ($gameParty.hasItem($dataWeapons[conditionsData.weaponID], true)) {
								return false;
							} else {
								//Continue
							}
						break;
						
						case "weaponCond3":
							//Is equipped by...
							if (conditionsData.weaponActID > 0) {
								if ($gameActors.actor(conditionsData.weaponActID).hasWeapon($dataWeapons[conditionsData.weaponID])) {
									//Continue
								} else {
									return false;
								}
							}
						break;
						
						case "weaponCond4":
							//Is not equipped by...
							if (conditionsData.weaponActID > 0) {
								if ($gameActors.actor(conditionsData.weaponActID).hasWeapon($dataWeapons[conditionsData.weaponID])) {
									return false;
								} else {
									//Continue
								}
							}
						break;
						
						case "weaponCond5":
							//Got a specific number of this weapon
							let weaponCount = $gameParty.numItems($dataWeapons[conditionsData.weaponID]);
							for (let i = 1; i < $dataActors.length; i++) {
								if ($gameActors.actor(i).hasWeapon($dataWeapons[conditionsData.weaponID])) {
									weaponCount++;
								}
							}
							if (weaponMath(weaponCount,conditionsData.weaponNumVal)) {
								//Continue
							} else {
								return false;
							}
						break;
					}
				}
			}
		}
		
		//Item Array criteria check
		if (story.conditions.itemArray.length > 0) {
			for (let i = 0; i < story.conditions.itemArray.length; i++) {
				const conditionsData = story.conditions.itemArray[i];
				
				//Check if a valid Item as been selected (no 0, no NaN)
				if (conditionsData.itemID > 0) {
					
					function itemMath(actualValue,criteria) {
						switch (conditionsData.itemNumCond) {
							case "itemNumCond1":
								//Equal to Abs
								if (actualValue === criteria) {
									return true;
								} else {
									return false; 
								}
							break;
							
							case "itemNumCond2":
								//More than Abs
								if (actualValue > criteria) {
									return true;
								} else {
									return false; 
								}
							break;
							
							case "itemNumCond3":
								//Less than Abs
								if (actualValue < criteria) {
									return true;
								} else {
									return false; 
								}
							break;
						}	
					}
					
					switch (conditionsData.itemCond) {
						case "itemCond1":
							//Is in inventory
							if ($gameParty.hasItem($dataItems[conditionsData.itemID])) {
								//Continue
							} else {
								return false;
							}
						break;
						
						case "itemCond2":
							//Is not in inventory
							if ($gameParty.hasItem($dataItems[conditionsData.itemID])) {
								return false;
							} else {
								//Continue
							}
						break;
						
						case "itemCond3":
							//Got a specific number of this item
							let itemCount = $gameParty.numItems($dataItems[conditionsData.itemID]);
							if (itemMath(itemCount,conditionsData.itemNumVal)) {
								//Continue
							} else {
								return false;
							}
						break;
					}
				}
			}
		}
		
		//Gold Array criteria check
		if (story.conditions.goldArray.length > 0) {
			for (let i = 0; i < story.conditions.goldArray.length; i++) {
				const conditionsData = story.conditions.goldArray[i];
				
				function goldMath(actualValue,criteria) {
					switch (conditionsData.goldNumCond) {
						case "goldNumCond1":
							//Equal to Abs
							if (actualValue === criteria) {
								return true;
							} else {
								return false; 
							}
						break;
						
						case "goldNumCond2":
							//More than Abs
							if (actualValue > criteria) {
								return true;
							} else {
								return false; 
							}
						break;
						
						case "goldNumCond23":
							//Less than Abs
							if (actualValue < criteria) {
								return true;
							} else {
								return false; 
							}
						break;
					}	
				}
				
				//Check the gold Array rule
				if (goldMath($gameParty.gold(),conditionsData.goldNumVal)) {
					//Continue
				} else {
					return false;
				}
			}
		}
		
		//Switch Array criteria check
		if (story.conditions.switchArray.length > 0) {
			for (let i = 0; i < story.conditions.switchArray.length; i++) {
				const conditionsData = story.conditions.switchArray[i];
				
				//Check if valid Switch ID
				if (conditionsData.switchNum > 0) {
					if ($gameSwitches.value(conditionsData.switchNum) === conditionsData.switchFlag) {
						//Continue
					} else {
						return false;
					}
				}
			}
		}
		
		//Variables Array criteria check
		if (story.conditions.varArray.length > 0) {
			for (let i = 0; i < story.conditions.varArray.length; i++) {
				const conditionsData = story.conditions.varArray[i];
				
				function varMath(actualValue,criteria) {
					switch (conditionsData.varCond) {
						case "varCond1":
							//Equal to Abs
							if (actualValue === criteria) {
								return true;
							} else {
								return false; 
							}
						break;
						
						case "varCond2":
							//More than Abs
							if (actualValue > criteria) {
								return true;
							} else {
								return false; 
							}
						break;
						
						case "varCond3":
							//Less than Abs
							if (actualValue < criteria) {
								return true;
							} else {
								return false; 
							}
						break;
						
						case "varCond4":
							//More or equal than Abs
							if (actualValue >= criteria) {
								return true;
							} else {
								return false; 
							}
						break;
						
						case "varCond5":
							//Less or equal than Abs
							if (actualValue <= criteria) {
								return true;
							} else {
								return false; 
							}
						break;
					}	
				}
				
				//Check if valid Variable ID
				if (conditionsData.varNum > 0) {
					if (varMath($gameVariables.value(conditionsData.varNum),conditionsData.varValue)) {
						//Continue
					} else {
						return false;
					}
				}
			}
		}
		
		//If function iterated here without return false...
		return true;
	}

	function getRandonPercentage() {
		return Math.floor(Math.random() * 101);
	}

	// Plugin Commands
	PluginManager.registerCommand('WD_FireplaceStories', 'initiateFireplace', function () {
		storyTime();
	});
	
	PluginManager.registerCommand('WD_FireplaceStories', 'addStory', function (args) {
		let duplicateFlag = false;
		
		if (args.newStory !== []) {
			let createStory = parseConditionData(args.newStory);
			
			function parseConditionData(rawData) {
				
			  try {
				const conditionObj = JSON.parse(rawData);
				let parsedCondition;
				
				if (conditionObj.condArray === "[]") {
					parsedCondition = {
					  id: parseInt(conditionObj.id),
					  priority: conditionObj.priority,
					  conditions: [],
					  chain: parseInt(conditionObj.chain),
					  modFreqFlag: conditionObj.modFreqFlag === 'true',
					  modFreq: parseInt(conditionObj.modFreq),
					  done: conditionObj.done === 'true',
					};
					
				} else {
					parsedCondition = {
					  id: parseInt(conditionObj.id),
					  priority: conditionObj.priority,
					  conditions: JSON.parse(conditionObj.condArray),
					  chain: parseInt(conditionObj.chain),
					  modFreqFlag: conditionObj.modFreqFlag === 'true',
					  modFreq: parseInt(conditionObj.modFreq),
					  done: conditionObj.done === 'true',
					};
					
					if (parsedCondition.conditions) {
						parsedCondition.conditions = JSON.parse(parsedCondition.conditions);
						
						if (parsedCondition.conditions.actorArray) {
							parsedCondition.conditions.actorArray = JSON.parse(parsedCondition.conditions.actorArray);
							
							for (const index in parsedCondition.conditions.actorArray)  {
								const actorData = JSON.parse(parsedCondition.conditions.actorArray[index]);

								actorData.actID = parseInt(actorData.actID);
								actorData.actNumVal = parseInt(actorData.actNumVal);
								
								parsedCondition.conditions.actorArray[index] = actorData;
							}
						}
						if (parsedCondition.conditions.armorArray) {
							parsedCondition.conditions.armorArray = JSON.parse(parsedCondition.conditions.armorArray);
							
							for (const index in parsedCondition.conditions.armorArray)  {
								const armorData = JSON.parse(parsedCondition.conditions.armorArray[index]);

								armorData.armorID = parseInt(armorData.armorID);
								armorData.armorActID = parseInt(armorData.armorActID);
								armorData.armorNumVal = parseInt(armorData.armorNumVal);
								
								parsedCondition.conditions.armorArray[index] = armorData;
							}
						}
						if (parsedCondition.conditions.goldArray) {
							parsedCondition.conditions.goldArray = JSON.parse(parsedCondition.conditions.goldArray);
							
							for (const index in parsedCondition.conditions.goldArray)  {
								const goldData = JSON.parse(parsedCondition.conditions.goldArray[index]);

								goldData.goldNumVal = parseInt(goldData.goldNumVal);
								
								parsedCondition.conditions.goldArray[index] = goldData;
							}
						}
						if (parsedCondition.conditions.itemArray) {
							parsedCondition.conditions.itemArray = JSON.parse(parsedCondition.conditions.itemArray);
							
							for (const index in parsedCondition.conditions.itemArray)  {
								const itemData = JSON.parse(parsedCondition.conditions.itemArray[index]);

								itemData.itemID = parseInt(itemData.itemID);
								itemData.itemNumVal = parseInt(itemData.itemNumVal);
								
								parsedCondition.conditions.itemArray[index] = itemData;
							}
						}
						if (parsedCondition.conditions.switchArray) {
							parsedCondition.conditions.switchArray = JSON.parse(parsedCondition.conditions.switchArray);
							
							for (const index in parsedCondition.conditions.switchArray)  {
								const switchData = JSON.parse(parsedCondition.conditions.switchArray[index]);

								switchData.switchNum = parseInt(switchData.switchNum);
								switchData.switchFlag = switchData.switchFlag === "true";
								
								parsedCondition.conditions.switchArray[index] = switchData;
							}
						}
						if (parsedCondition.conditions.varArray) {
							parsedCondition.conditions.varArray = JSON.parse(parsedCondition.conditions.varArray);
							
							for (const index in parsedCondition.conditions.varArray)  {
								const varData = JSON.parse(parsedCondition.conditions.varArray[index]);

								varData.varNum = parseInt(varData.varNum);
								varData.varValue = parseInt(varData.varValue);
								
								parsedCondition.conditions.varArray[index] = varData;
							}
						}
						if (parsedCondition.conditions.weaponArray) {
							parsedCondition.conditions.weaponArray = JSON.parse(parsedCondition.conditions.weaponArray);
							
							for (const index in parsedCondition.conditions.weaponArray)  {
								const weaponData = JSON.parse(parsedCondition.conditions.weaponArray[index]);

								weaponData.weaponID = parseInt(weaponData.weaponID);
								weaponData.weaponActID = parseInt(weaponData.weaponActID);
								weaponData.weaponNumVal = parseInt(weaponData.weaponNumVal);
								
								parsedCondition.conditions.weaponArray[index] = weaponData;
							}
						}
						
					}
				}
				
				return parsedCondition;
			  } catch (error) {
				console.error('Error parsing condition data:', error);
				return null;
			  }
			}
			
			loadStories();
			for (let i = 0; i < storiesArray.length; i++) {
				const checkStory = storiesArray[i];
				
				if (checkStory.id === createStory.id) {
					duplicateFlag = true;
				}
			}
			if (!duplicateFlag) {
				storiesArray.push(createStory);
			} else {
				console.error("Tried to create a story with duplicate ID");
			}
			saveStories();
		}
	});
	
	PluginManager.registerCommand('WD_FireplaceStories', 'removeStory', function (args) {
		const indexToRemove = parseInt(args.storyID);
		let foundIndex = -1;
		
		for (let i = 0; i < storiesArray.length; i++) {
			const story = storiesArray[i];
			
			if (story.id === indexToRemove) {
				foundIndex = i;
				break;
			}
		}
		if (foundIndex !== -1) {
			storiesArray.splice(foundIndex, 1);
		}
	});	
	
	PluginManager.registerCommand('WD_FireplaceStories', 'completeStory', function (args) {
		const indexToComplete = parseInt(args.storyID);
		
		for (let i = 0; i < storiesArray.length; i++) {
			const story = storiesArray[i];
			
			if (story.id === indexToComplete) {
				storiesArray[i].done = true;
				break;
			}
		}
	});	
	
	PluginManager.registerCommand('WD_FireplaceStories', 'reactivateStory', function (args) {
		const indexToDecomplete = parseInt(args.storyID);
		
		for (let i = 0; i < storiesArray.length; i++) {
			const story = storiesArray[i];
			
			if (story.id === indexToDecomplete) {
				storiesArray[i].done = false;
				break;
			}
		}
	});	
	
	// Save and Load functions
	Game_System.prototype.savestoriesArray = function() {
	  this._storiesArray = storiesArray;
	};
	
	Game_System.prototype.getstoriesArray = function() {
	  return this._storiesArray || [];
	};
	
	function saveStories() {
		$gameSystem.savestoriesArray();
	}
	
	function loadStories() {
		let loader = $gameSystem.getstoriesArray();
		
		if (loader !== []) {
			storiesArray = loader
		}
	}
	 
})();