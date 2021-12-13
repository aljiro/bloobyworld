
class Simulation{
    constructor(height, width){
        this.agent = {x: height/2, y: width/2, energy: 255, dirx: 0.0, diry: 0.0};
        this.step = 10.0;
        this.height = height;
        this.width = width;
        this.food = [];
    }

    addFood(){
        this.food.push( {x: Math.random()*(this.height-20) + 10, 
                         y: Math.random()*(this.width-20) + 10});
    }

    move(){
        let clip = (a, b) => 1/(1 + Math.exp(-30*(Math.abs(a)-b)))
        let attx = clip(this.width/2.0 - this.agent.x, this.width/2.0)*(this.width/2.0 - this.agent.x);
        let atty = clip(this.height/2.0 - this.agent.y, this.height/2.0)*(this.height/2.0 - this.agent.y);
        let n = Math.sqrt(attx**2 + atty**2);
        
        if( n > 0 ){
            attx /= n;
            atty /= n;
        }

        this.agent.dirx += attx;
        this.agent.diry += atty;

        this.agent.x += this.step*this.agent.dirx*this.agent.energy/255.0;
        this.agent.y += this.step*this.agent.diry*this.agent.energy/255.0;
    }

    update(){
        
        if( Math.random() > 0.8 ){
            this.agent.dirx = Math.random()-0.5;
            this.agent.diry = Math.random()-0.5;
        }
        
        this.food.forEach((food, index) => {
            let d = Math.sqrt((this.agent.x - food.x)**2 + (this.agent.y - food.y)**2);
            
            if( d < 5.0 ){
                this.food.splice(index,1);
                this.agent.energy+= 5;
            }

            if( d < 100.0 ){
                this.agent.dirx = food.x - this.agent.x;
                this.agent.diry = food.y - this.agent.y;
                let n = Math.sqrt(this.agent.dirx**2 + this.agent.diry**2);
                this.agent.dirx /= n;
                this.agent.diry /= n;
            }
        });

        this.move();
        this.agent.energy-= 0.1;
    }

    serialize(){

        return {
            food: this.food,
            agent: {x: this.agent.x, y: this.agent.y, energy:this.agent.energy},
            
        };
    }
}

module.exports = Simulation;

