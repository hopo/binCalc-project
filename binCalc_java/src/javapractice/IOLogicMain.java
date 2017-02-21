package javapractice;

class IOLogic{
	byte i;
	byte o;
	void setOprands(int i){
		this.i = (byte)i;
	}
	byte output(){
		this.o = i;
		return o;
	}
	void run(){
		System.out.println("[[ IO Logic ]]\n");
		System.out.println("i: "+this.i);
		System.out.println("Q: "+this.output());		
	}
}

public class IOLogicMain{
	public static void main(String[] args){
		IOLogic io = new IOLogic();
		io.setOprands(1);
		io.run();
	}
};