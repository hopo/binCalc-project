package javapractice;

public class ORLogic{
	byte ia,ib;
	public ORLogic(int ia, int ib){
		this.ia=(byte)ia;
		this.ib=(byte)ib;
	}
	public byte output(){
		if((this.ia==0)&&(this.ib==0)){
			return 0;
		}else{
			return 1;
		}
	}
	void run(){
		System.out.println("[[ OR Logic ]]\n");
		System.out.println("ia: "+this.ia);
		System.out.println("ib: "+this.ib);
		System.out.println("Q: "+output());		
	}
	public static void main (String[] args){
		ORLogic O = new ORLogic(1,0);
		O.run();
	}
}