Script = [
	{
		speech: [
			{
				subject: 'senpai',
				emotion: 'normal',
				text: 'Heya! Wake up, sleepy face. (Space to continue)'
			}, {
				subject: 'circle',
				emotion: 'annoyed',
				text: 'Ugghh what time is it?'
			},{
				subject: 'senpai',
				emotion: 'normal',
				text: 'It doesn\'t matter, you\'re late. We were supposed to meet up at the training course for transformation training today, remember?',
			},{
				subject: 'circle',
				emotion: 'normal',
				text: 'Oh ya! Let\'s go!'
			}
		]
	},
	{
		speech: [
			{
				subject: 'senpai',
				emotion: 'normal',
				text: 'Today I\'ve set up a series of obstacles for you to learn how to do transform between our three basic natures. This world is a dangerous place, so pay close attention.'
			},{
				subject: 'circle',
				emotion: 'normal',
				text: 'Ya senpai!'
			},{
				subject: 'senpai',
				emotion: 'normal',
				text: 'Before we begin, remember your basic training. <- -> directions, ^ to jump.'
			},{
				subject: 'senpai',
				emotion: 'normal',
				text: 'In your current state, you float on water but are punctured by spikes easily. Go through the basic obstacles I\'ve set up, and we\'ll meet at the end for the next step.'
			},{
				subject: 'circle',
				emotion: 'annoyed',
				text: 'I will do my best!'
			}

		]
	},
	{
		speech: [
			{
				subject: 'senpai',
				emotion: 'normal',
				text: 'Good job on getting past the basic obstacles. Now I\'ll teach you about nature transformations.'
			},{
				subject: 'circle',
				emotion: 'normal',
				text: 'Ya!!!'
			},{
				subject: 'senpai',
				emotion: 'normal',
				text: 'Heya, listen close now. Before you can change natures, you need to learn about transformation energy.'
			},{
				subject: 'circle',
				emotion: 'normal',
				text: 'Transformation energy?'
			},{
				subject: 'senpai',
				emotion: 'normal',
				text: 'Yes, transformation energy. Every change you make requires transformation energy, of which you have a limited amount.'
			},{
				subject: 'senpai',
				emotion: 'normal',
				text: 'Change too much, and you won\'t be able to get through the obstacles without restarting. You will need to use R to restart if you\'ve used up all of your transformation energy.'
			},{
				subject: 'senpai',
				emotion: 'normal',
				text: 'Ok, now that you know the basics, transform into your second state using S or 2.',
				callback: function(){ 
					this.hero.type = "square";
					this.hero.setBlockMass(3);
					this.hero._createSprings();
					transformSfx.play();
				}
			},{
				subject: 'square',
				emotion: 'normal',
				text: 'Senpai, I\'m so heavy!'
			},{
				subject: 'senpai',
				emotion: 'normal',
				text: 'Yes, in this form, you\'ll be heavy but strong. You can now push blocks and remain unaffected by any spikes you encounter. Give it a try with this obstacle course.'
			},{
				subject: 'square',
				emotion: 'normal',
				text: 'I will do my best!'
			}
		]
	}
];