class EllipticCurve{

    constructor(){
        this.a = 0
        this.b = 7
        this.p = 2143
        this.n = 2089
        this.Gx = 122
        this.Gy = 107
        this.m = 1111
        const Q = [212,50]
        this.Qx = Q[0]
        this.Qy = Q[1]
        this.k = 111
    }

    mod(n, m){
        return (n % m + m) % m;
    }

    inversModulo(a,m){
        a = ( +a ) % m;
    
        if( a < 0 ) a += m;
        
        for( var i = 0; i < m; i += 1 ) {
            if( ( a * i ) % m === 1 ) return i;     
        }
    
        return NaN;
    }

    penjumlahanTitik(x1,y1,x2,y2){
        if(x1 === null && y1 === null) return [x2,y2]
    
        if(x2 === null && y2 === null) return [x1,y1]
    
        let m
    
        if (x1 !== x2) m = (y2 - y1) * this.inversModulo(x2-x1,this.p)
    
        else {
            if (y1 === 0 && y2 === 0) return [null,null]
    
            else if(y1 === y2) m = (3 * x1 * x1 + this.a) * this.inversModulo(2*y1,this.p)
    
            else return [null,null]
        }
    
        m %= this.p
    
        let x = this.mod((m * m - x1 - x2), this.p)
        let y = this.mod((m * (x1 -x) - y1), this.p)
    
        return [x,y]   
    }

    perkalianTitik(k,x1,y1){
        let [x,y] = [null,null] 
        for(let i = 1; i <= k; ++i){     
            [x,y] = this.penjumlahanTitik(x1,y1,x,y)    
        }
        return [x,y]
    }
    
    chunkString (str, len) {
        const size = Math.ceil(str.length/len)
        const r = Array(size)
        let offset = 0
        
        for (let i = 0; i < size; i++) {
          r[i] = str.substr(offset, len)
          offset += len
        }
        
        return r
    }

    signature(Hm){
        const kA = this.perkalianTitik(this.k,this.Gx,this.Gy)
        const r = this.mod(kA[0],this.n)
        const kInv = this.inversModulo(this.k,this.n)
        const s = this.mod(kInv*(Hm+this.m*r),this.n)
        return [r,s]
    }

    verifySignature(Hm,r,s){
        const w = this.inversModulo(s,this.n)
        const i = this.mod(w*Hm,this.n)
        const j = this.mod(w*r,this.n)
        const iA = this.perkalianTitik(i,this.Gx,this.Gy)
        const jB = this.perkalianTitik(j,this.Qx,this.Qy)
        const [u,v] = this.penjumlahanTitik(iA[0],iA[1],jB[0],jB[1])
        return this.mod(u,this.n) === r
    }

    sign(Hm){
        const hashList = this.chunkString(Hm,8)
        const signatureList = []
        hashList.forEach(hash => {
            const hashValue = parseInt(hash,16)
            const signature = this.signature(hashValue)
            signatureList.push(signature)
        })
        return signatureList
    }

    verify(Hm,signatureList){
        const hashList = this.chunkString(Hm,8)
        for ( let i = 0; i < signatureList.length; ++i){
            const hashValue = parseInt(hashList[i],16)
            const [r,s] = signatureList[i]
            const isValid = this.verifySignature(hashValue,r,s)
            if (!isValid) return false
        }
        return true
    }

}

module.exports = EllipticCurve

