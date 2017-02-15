package javapractice;

public class NORLogic{
	byte ia,ib;
	public NORLogic(int ia,int ib){
		this.ia=(byte)ia;
		this.ib=(byte)ib;		
	}
	byte output(){
		if((this.ia==0)&&(this.ib==0)){
			return 1;
		}else{
			return 0;
		}
	}
	void run(){
		System.out.println("[ NOR Logic ]\n");
		System.out.println("ia: "+this.ia);
		System.out.println("ib: "+this.ib);
		System.out.println("Q: "+output());		
	}
	public static void main(String[] args){
		NORLogic NO = new NORLogic(0,0);
		NO.run();
	}
}