package circuit.tester;
public class Gate{
	public static byte OR(byte ia, byte ib){
		if((ia==0)&&(ib==0)){
			return 0;
		}else{
			return 1;
		}
	}
	public static byte AND(byte ia, byte ib){
		if((ia==1)&&(ib==1)){
			return 1;
		}else{
			return 0;
		}
	}
	public static byte NOR(byte ia, byte ib){
		if((ia==0)&&(ib==0)){
			return 1;
		}else{
			return 0;
		}
	}
	public static byte NAND(byte ia, byte ib){
		if((ia==1)&&(ib==1)){
			return 0;
		}else{
			return 1;
		}
	}
	public static byte XOR(byte ia, byte ib){		
		return Gate.AND(Gate.OR(ia, ib), Gate.NAND(ia, ib));
	}
}