package javapractice;

public class XORLogic{
	byte ia, ib;
	byte aa, bb;
	public XORLogic(int ia, int ib){
		this.ia=(byte)ia;
		this.ib=(byte)ib;
	}
	//byte output(){		
		//this.aa = Gates.ORgate(this.ia, this.ib);
		//this.bb = Gates.NANDgate(this.ia, this.ib);
		//return Gates.ANDgate(this.aa, this.bb);
	//}
	void run(){
		System.out.println("[[ XOR Logic ]]\n");
		System.out.println("ia: "+this.ia);
		System.out.println("ib: "+this.ib);
	}
	public static void main(String[] args){
		XORLogic XO = new XORLogic(1,1);
		XO.run();
	}
}