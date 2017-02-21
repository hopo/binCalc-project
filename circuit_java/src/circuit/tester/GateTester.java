package circuit.tester;

public class GateTester {
	byte ia, ib;
	void setOprands(int ia, int ib){
		this.ia=(byte)ia;
		this.ib=(byte)ib;
	}
	void run(){
		System.out.println("ia("+ia+") ib("+ib+")");
		System.out.println("_OR   : "+Gate.OR(ia,ib));
		System.out.println("_AND  : "+Gate.AND(ia, ib));
		System.out.println("_NOR  : "+Gate.NOR(ia, ib));
		System.out.println("_NAND : "+Gate.NAND(ia, ib));
		System.out.println("_XOR  : "+Gate.XOR(ia, ib));
	}
	public static void main(String[] args){
		GateTester T = new GateTester();
		T.setOprands(0, 1);
		T.run();
		}
}