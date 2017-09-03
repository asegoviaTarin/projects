import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pass'
})
export class PassPipe implements PipeTransform {

  transform(value: string, activado:boolean ): string {
  	var result:string=value;
  	if(activado)
  	{
  		var resulpass= '';
  		for (var i = 0; i < result.length; ++i) {
  			resulpass+='*';
  		}
  		result=resulpass;
  	}
    return result;
  }

}
