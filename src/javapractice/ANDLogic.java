package javapractice;

public class ANDLogic{
	byte ia, ib;
	public ANDLogic(int ia, int ib){
		this.ia = (byte)ia;
		this.ib = (byte)ib;
	}
	public byte output(){
		if((this.ia==1)&&(this.ib==1)){
			return 1;
		}else{
			return 0;
		}
	}
	void run(){
		System.out.println("[[ AND Logic ]]\n");
		System.out.println("ia: "+this.ia);
		System.out.println("ib: "+this.ib);
		System.out.println("Q: "+output());
	}
	public static void main(String[] args){
		ANDLogic A = new ANDLogic(1,0);
		A.run();
	}
}