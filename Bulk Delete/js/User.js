class User 
{

    constructor()
    {
        this.score=0;
        this.highScore=0;
        this.pad;
        this.fill="hotpink";
        this.stroke="#ffffff";
        this.h=50;
        this.w=20;
        this.force=1;
        this.power=5;
        this.fy=.85;
        this.keys={u:`w`, d:`s`, s:`d`};
        return this;
    }

    setProps(obj={})
    {
        for(let i in obj)
        {
            if(this[i] !== undefined)
            {
                this[i] = obj[i]
            }
        }
        return this;
    }
}